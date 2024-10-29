package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.entities.Project;
import com.cooksys.groupfinal.mappers.ProjectMapper;
import com.cooksys.groupfinal.repositories.ProjectRepository;
import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.services.ProjectService;

import lombok.RequiredArgsConstructor;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

        private final ProjectMapper projectMapper;
        private final ProjectRepository projectRepository;

    @Override
    public Set<ProjectDto> getProjects() {
        Set<Project> projects = new HashSet<>(projectRepository.findAll());
        return projectMapper.entitiesToDtos(projects);
    }

    @Override
    public ProjectDto updateProject(Long id, ProjectDto projectDto) {
        Optional<Project> findProject = projectRepository.findById(id);
        Project updatedProject = findProject.get();

        updatedProject.setActive(projectDto.isActive());
        updatedProject.setDescription(projectDto.getDescription());
        updatedProject.setName(projectDto.getName());
        projectRepository.save(updatedProject);

        return projectMapper.entityToDto(updatedProject);
    }
}
