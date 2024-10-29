package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.BasicUserDto;
import com.cooksys.groupfinal.dtos.ProjectDto;
import com.cooksys.groupfinal.dtos.TeamDto;
import com.cooksys.groupfinal.dtos.TeamRequestDto;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.Project;
import com.cooksys.groupfinal.entities.Team;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.mappers.BasicUserMapper;
import com.cooksys.groupfinal.mappers.CompanyMapper;
import com.cooksys.groupfinal.mappers.ProjectMapper;
import com.cooksys.groupfinal.mappers.TeamMapper;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import com.cooksys.groupfinal.repositories.ProjectRepository;
import com.cooksys.groupfinal.repositories.TeamRepository;
import com.cooksys.groupfinal.repositories.UserRepository;
import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.services.TeamService;

import lombok.RequiredArgsConstructor;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {

    private final TeamRepository teamRepository;
    private final TeamMapper teamMapper;
    private final UserRepository userRepository;
    private final BasicUserMapper basicUserMapper;
    private final CompanyRepository companyRepository;
    private final CompanyMapper companyMapper;
    private final ProjectMapper projectMapper;
    private final ProjectRepository projectRepository;


    @Override
    public Set<BasicUserDto> getAllTeammates(Long id) {
        Optional<Team> getTeam = teamRepository.findById(id);
        if (getTeam.isEmpty()) {
            throw new BadRequestException("Team not found");
        }
        Team thisTeam = getTeam.get();
        return basicUserMapper.entitiesToBasicUserDtos(thisTeam.getTeammates());
    }

    @Override
    public TeamDto getTeamById(Long id) {
        Optional<Team> getTeam = teamRepository.findById(id);
        if (getTeam.isEmpty()) {
            throw new BadRequestException("Team not found");
        }
        Team thisTeam = getTeam.get();
        return teamMapper.entityToDto(thisTeam);
    }

    @Override
    public Set<TeamDto> getTeamByCompanyId(Long companyId) {
        Optional<Company> findCompany = companyRepository.findById(companyId);
        if (findCompany.isEmpty()) {
            throw new BadRequestException("Company not found");
        }
        Company thisCompany = findCompany.get();

        return teamMapper.entitiesToDtos(thisCompany.getTeams());
    }

    @Override
    public ProjectDto createNewProjectByTeamId(Long id, ProjectDto projectDto) {
        Optional<Team> findTeam = teamRepository.findById(id);
        if (findTeam.isEmpty()) {
            throw new BadRequestException("Team not found");
        }
        Project newProject = projectMapper.dtoToEntity(projectDto);

        Team thisTeam = findTeam.get();
        thisTeam.getProjects().add(newProject);
        teamRepository.save(thisTeam);
        newProject.setTeam(thisTeam);

        projectRepository.save(newProject);

        return projectMapper.entityToDto(newProject);

    }

    @Override
    public TeamDto createTeam(Long companyId, TeamRequestDto teamDto) {
        Optional<Company> findCompany = companyRepository.findById(companyId);
        if (findCompany.isEmpty()) {
            throw new BadRequestException("Company not found");
        }

        Team newTeam = teamMapper.requestDtoToEntity(teamDto);

        Company thisCompany = findCompany.get();
        newTeam.setCompany(thisCompany); // Set the company reference
        thisCompany.getTeams().add(newTeam); // Add the team to the company's list


        teamRepository.save(newTeam);

        return teamMapper.entityToDto(newTeam);
    }

    @Override
    public Set<ProjectDto> getTeamProjects(Long id) {
        Optional<Team> findTeam = teamRepository.findById(id);
        Set<ProjectDto> projects = projectMapper.entitiesToDtos(findTeam.get().getProjects());

        return projects;
    }






}
