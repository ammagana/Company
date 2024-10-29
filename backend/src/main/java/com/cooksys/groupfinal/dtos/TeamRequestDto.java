package com.cooksys.groupfinal.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@NoArgsConstructor
@Data
public class TeamRequestDto {
    String name;
    String description;
    Set<BasicUserDto> teammates;
}
