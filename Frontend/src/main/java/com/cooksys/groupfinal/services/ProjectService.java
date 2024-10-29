package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.ProjectDto;

import java.util.Set;

public interface ProjectService {

    Set<ProjectDto> getProjects();

    ProjectDto updateProject(Long id, ProjectDto projectDto);
}
