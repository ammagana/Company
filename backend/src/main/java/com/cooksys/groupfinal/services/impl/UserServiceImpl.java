package com.cooksys.groupfinal.services.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.mappers.BasicUserMapper;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;
import com.cooksys.groupfinal.entities.Credentials;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotAuthorizedException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.CredentialsMapper;
import com.cooksys.groupfinal.mappers.FullUserMapper;
import com.cooksys.groupfinal.repositories.UserRepository;
import com.cooksys.groupfinal.services.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final CompanyRepository companyRepository;
	private final UserRepository userRepository;
  	private final FullUserMapper fullUserMapper;
	private final CredentialsMapper credentialsMapper;
    private final BasicUserMapper basicUserMapper;
	
    public boolean checkCredentials(String username) {
	    Optional<User> optionalUser = userRepository.findByCredentialsUsernameAndActiveTrue(username);
	    if (username == null || optionalUser.isEmpty()) {
	      throw new NotFoundException("credentials do not match existing user");
	    }
	    return true;
	  }
    
	private User findUser(String username) {
        Optional<User> user = userRepository.findByCredentialsUsernameAndActiveTrue(username);
        if (user.isEmpty()) {
            throw new NotFoundException("The username provided does not belong to an active user.");
        }
        return user.get();
    }
	
	@Override
	public FullUserDto login(CredentialsDto credentialsDto) {
		if (credentialsDto == null || credentialsDto.getUsername() == null || credentialsDto.getPassword() == null) {
            throw new BadRequestException("A username and password are required.");
        }
        Credentials credentialsToValidate = credentialsMapper.dtoToEntity(credentialsDto);
        User userToValidate = findUser(credentialsDto.getUsername());
        if (!userToValidate.getCredentials().equals(credentialsToValidate)) {
            throw new NotAuthorizedException("The provided credentials are invalid.");
        }
        if (userToValidate.getStatus().equals("PENDING")) {
        	userToValidate.setStatus("JOINED");
        	userRepository.saveAndFlush(userToValidate);
        }
        return fullUserMapper.entityToFullUserDto(userToValidate);
	}

    @Override
    public Set<BasicUserDto> getAllUsers() {
        List<User> userList=   userRepository.findAll();
        Set<User> users = new HashSet<>(userList);
        return basicUserMapper.entitiesToBasicUserDtos(users);
    }

	@Override
	public BasicUserDto deleteUser(Long id, UserRequestDto userRequestDto) {
		
		@SuppressWarnings("deprecation")
		User user = userRepository.getById(id);
		if(user == null) {
			throw new NotFoundException("User with id: " + id + " not found"); 
		}
		if(!user.isAdmin()) {
			throw new NotAuthorizedException("You do not have required permission!");
		}
		if(!checkCredentials(userRequestDto.getCredentials().getUsername())) {
			throw new NotAuthorizedException("Invalid user!");
		}
		user.setActive(false);
		userRepository.saveAndFlush(user);
		return basicUserMapper.entityToBasicUserDto(user);
		
	}

	@Override
	public FullUserDto createUser(Long companyId, UserRequestDto userRequestDto) {
		
		if (userRequestDto == null || userRequestDto.getCredentials() == null || userRequestDto.getProfile() == null) {
            throw new BadRequestException("Incomplete field");
        }
        User user = fullUserMapper.requestDtoToEntity(userRequestDto);
//        user.setCompanies(companyRepository.findAllById(companyId));
		Set<Company> companies = new HashSet<>();
		Company company = companyRepository.findById(companyId).get();
		user.setCompanies(companies);
        user.setActive(true);
		if(userRequestDto.isAdmin()){
			user.setAdmin(true);
			}
        User savedUser = userRepository.saveAndFlush(user);
		Set<User> userSet = company.getEmployees();
		userSet.add(user);
		companies.add(company);
		Company savedCompany = companyRepository.saveAndFlush(company);
        return fullUserMapper.entityToFullUserDto(savedUser);
	}


}
