package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.ProjectDto;
import org.springframework.web.bind.annotation.*;

import com.cooksys.groupfinal.services.ProjectService;

import lombok.RequiredArgsConstructor;

import java.util.Set;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController {
	
	private final ProjectService projectService;

	@GetMapping
	Set<ProjectDto> getProjects(){ return projectService.getProjects(); }

	@PatchMapping("{id}/update")
	@CrossOrigin(origins="*")
	ProjectDto updateProject(@PathVariable Long id, @RequestBody ProjectDto projectDto){ return projectService.updateProject(id, projectDto);}
}
