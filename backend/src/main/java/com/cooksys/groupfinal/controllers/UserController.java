package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.services.CompanyService;
import org.springframework.web.bind.annotation.*;

import com.cooksys.groupfinal.dtos.CredentialsDto;
import com.cooksys.groupfinal.dtos.FullUserDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;
import com.cooksys.groupfinal.services.UserService;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
	
	private final UserService userService;
    private final CompanyService companyService;
	
	@PostMapping("/login")
	@CrossOrigin(origins="*")
    public FullUserDto login(@RequestBody CredentialsDto credentialsDto) {
        return userService.login(credentialsDto);
    }

    @GetMapping
    public Set<BasicUserDto> getAllUsers(){ return  userService.getAllUsers(); }

    @DeleteMapping("/delete/{id}")
    @CrossOrigin(origins="*")
    public BasicUserDto deleteUser(@PathVariable Long id, @RequestBody UserRequestDto userRequestDto) {
    	return userService.deleteUser(id, userRequestDto);
    }
    
    @PostMapping("/register/{companyId}")
    @CrossOrigin(origins="*")
    public FullUserDto createUser(@PathVariable Long companyId, @RequestBody UserRequestDto userRequestDto) {
//        companyService.addUser();
        return userService.createUser(companyId, userRequestDto);
    }
}
