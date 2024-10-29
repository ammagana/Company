package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;

import java.util.List;
import java.util.Set;

public interface UserService {

	FullUserDto login(CredentialsDto credentialsDto);


    Set<BasicUserDto> getAllUsers();


	BasicUserDto deleteUser(Long id, UserRequestDto userRequestDto);


	FullUserDto createUser(Long companyId, UserRequestDto userRequestDto);
}
