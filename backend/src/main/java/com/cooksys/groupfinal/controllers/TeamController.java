package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.*;
import org.springframework.web.bind.annotation.*;

import com.cooksys.groupfinal.services.TeamService;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/team")
@RequiredArgsConstructor
public class TeamController {

	private final TeamService teamService;


	@GetMapping("{id}/teammates")
	@CrossOrigin(origins="*")
	public Set<BasicUserDto> getAllTeammates(@PathVariable Long id) { return teamService.getAllTeammates(id);}

	@GetMapping("{id}")
	@CrossOrigin(origins="*")
	public TeamDto getTeamById(@PathVariable Long id) { return teamService.getTeamById(id); }

	@GetMapping("/{companyId}/teams")
	@CrossOrigin(origins="*")
	public Set<TeamDto> getTeamByCompany(@PathVariable Long companyId){ return teamService.getTeamByCompanyId(companyId); }

	@PostMapping("/{companyId}/create")
	@CrossOrigin(origins="*")
	public TeamDto createTeam(@PathVariable Long companyId, @RequestBody TeamRequestDto teamDto) { return teamService.createTeam(companyId, teamDto); }

	@GetMapping("/{id}/projects")
	@CrossOrigin(origins="*")
	public Set<ProjectDto> getTeamProjects(@PathVariable Long id){ return teamService.getTeamProjects(id); }

	@PostMapping("/{id}/createProject")
	@CrossOrigin(origins="*")
	public ProjectDto createNewProjectByTeamId(@PathVariable Long id, @RequestBody ProjectDto projectDto){ return teamService.createNewProjectByTeamId(id, projectDto); }
}

