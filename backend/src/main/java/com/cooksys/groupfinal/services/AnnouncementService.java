package com.cooksys.groupfinal.services;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;

import java.util.Set;

public interface AnnouncementService {

    Set<AnnouncementDto> getAllAnnouncements(Long companyId);

    AnnouncementDto createAnnouncements(Long companyId, AnnouncementDto announcementDto);

	AnnouncementDto deleteAnnouncementById(Long announcementId, UserRequestDto userRequestDto);
}
