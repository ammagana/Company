package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.dtos.TeamRequestDto;

import java.util.Set;

public interface TeamService {

    Set<BasicUserDto> getAllTeammates(Long id);


    TeamDto getTeamById(Long id);

    TeamDto createTeam(Long companyId, TeamRequestDto teamRequestDto);

    Set<ProjectDto> getTeamProjects(Long id);

    Set<TeamDto> getTeamByCompanyId(Long companyId);

    ProjectDto createNewProjectByTeamId(Long id, ProjectDto projectDto);
}
