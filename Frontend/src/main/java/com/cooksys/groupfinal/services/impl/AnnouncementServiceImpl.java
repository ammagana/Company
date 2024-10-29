package com.cooksys.groupfinal.services.impl;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;
import com.cooksys.groupfinal.entities.Announcement;
import com.cooksys.groupfinal.entities.Company;
import com.cooksys.groupfinal.entities.User;
import com.cooksys.groupfinal.exceptions.BadRequestException;
import com.cooksys.groupfinal.exceptions.NotFoundException;
import com.cooksys.groupfinal.mappers.AnnouncementMapper;
import com.cooksys.groupfinal.mappers.BasicUserMapper;
import com.cooksys.groupfinal.mappers.CompanyMapper;
import com.cooksys.groupfinal.repositories.AnnouncementRepository;
import com.cooksys.groupfinal.repositories.CompanyRepository;
import org.springframework.stereotype.Service;

import com.cooksys.groupfinal.services.AnnouncementService;
import com.cooksys.groupfinal.services.AuthorizationService;

import lombok.RequiredArgsConstructor;

import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AnnouncementServiceImpl implements AnnouncementService {

    private final CompanyMapper companyMapper;
    private final BasicUserMapper userMapper;
    private final AuthorizationService authorizationService;
    private final CompanyRepository companyRepository;
    private final AnnouncementMapper announcementMapper;
    private final AnnouncementRepository announcementRepository;

    @Override
    public Set<AnnouncementDto> getAllAnnouncements(Long companyId) {
        Optional<Company> findCompany = companyRepository.findById(companyId);
        if(findCompany.isEmpty()){
            throw new BadRequestException("Company not found");
        }
        Company thisCompany = findCompany.get();
        return announcementMapper.entitiesToDtos(thisCompany.getAnnouncements());
    }

    @Override
    public AnnouncementDto createAnnouncements(Long companyId, AnnouncementDto announcementDto) {
        Optional<Company> findCompany = companyRepository.findById(companyId);
        if(findCompany.isEmpty()){
            throw new BadRequestException("Company not found");
        }
        Announcement newAnnouncement = announcementMapper.dtoToEntity(announcementDto);

        Company thisCompany = findCompany.get();
        thisCompany.getAnnouncements().add(newAnnouncement);

        newAnnouncement.setCompany(thisCompany);
        announcementRepository.save(newAnnouncement);
    

        return announcementMapper.entityToDto(newAnnouncement);

    }

	@Override
	public AnnouncementDto deleteAnnouncementById(Long announcementId, UserRequestDto userRequestDto) {
		//Check for admin
		
		User requestingUser = authorizationService.userIsAdmin(userRequestDto);
		
		// Fetching announcement
        Announcement announcementToDelete = announcementRepository.findById(announcementId)
                .orElseThrow(() -> new NotFoundException("Announcement with ID " + announcementId + " not found."));

        // Check if the requesting user is part of the company of the announcement
        if (!announcementToDelete.getCompany().getEmployees().contains(requestingUser)) {
            throw new NotFoundException("User is not part of the company associated with this announcement.");
        }

        // Delete the announcement
        announcementRepository.delete(announcementToDelete);
        announcementRepository.flush();

        // Return the details of the deleted announcement
        return announcementMapper.entityToDto(announcementToDelete);
	}
}