package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.crew.Crew;
import com.korit.running_back_s2.domain.crew.CrewMapper;
import com.korit.running_back_s2.dto.crew.CrewRegisterReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CrewService {

    private final CrewMapper crewMapper;
    private final FileService fileService;

    public void register(CrewRegisterReqDto dto) {
        String uploadedFilename = fileService.uploadFile(dto.getCrewProfileImg(), "/crew");

        Crew crew = Crew.builder()
                .userId(dto.getUserId())
                .gunguId(dto.getGunguId())
                .crewName(dto.getCrewName())
                .title(dto.getTitle())
                .content(dto.getContent())
                .limitedPeople(dto.getLimitedPeople())
                .crewProfileImg("/crew/" + uploadedFilename)
                .crewThumbnailImg("/crew/" + uploadedFilename)
                .userId(dto.getUserId())
                .build();

        crewMapper.insert(crew);
    }

    public String checkCrewNames(String crewName) {
        Crew checkCrewName = crewMapper.findByCrewName(crewName);
        if (checkCrewName == null) {
            return "false";
        } else {
            return "true";
        }
    }
}