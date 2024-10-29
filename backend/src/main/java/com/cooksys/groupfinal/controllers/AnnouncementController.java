package com.cooksys.groupfinal.controllers;

import com.cooksys.groupfinal.dtos.AnnouncementDto;
import com.cooksys.groupfinal.dtos.UserRequestDto;
import com.cooksys.groupfinal.entities.Announcement;
import com.cooksys.groupfinal.entities.Company;
import org.springframework.web.bind.annotation.*;

import com.cooksys.groupfinal.services.AnnouncementService;

import lombok.RequiredArgsConstructor;

import java.util.Set;

@RestController
@RequestMapping("/announcements")
@RequiredArgsConstructor
@CrossOrigin(origins="*")
public class AnnouncementController {
	
	private final AnnouncementService announcementService;

	@GetMapping("/{companyId}")
	public Set<AnnouncementDto> getAllAnnouncements(@PathVariable Long companyId){ return announcementService.getAllAnnouncements(companyId); }

	@PostMapping("/{companyId}/create")
	public AnnouncementDto createAnnouncements(@PathVariable Long companyId, @RequestBody AnnouncementDto announcementDto){ return announcementService.createAnnouncements(companyId, announcementDto); }

	@DeleteMapping("/{announcementId}")
	@CrossOrigin(origins="*")
	public AnnouncementDto deleteAnnouncementById(@PathVariable Long announcementId, @RequestBody UserRequestDto userRequestDto){
		return announcementService.deleteAnnouncementById(announcementId, userRequestDto);
	}

}
