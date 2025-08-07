package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.crew.Crew;
import com.korit.running_back_s2.domain.crew.CrewMapper;
import com.korit.running_back_s2.dto.crew.CrewRegisterReqDto;
import com.korit.running_back_s2.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CrewService {

    private final CrewMapper crewMapper;
    private final FileService fileService;
    private final PrincipalUtil principalUtil;

    public void register(CrewRegisterReqDto dto) {
        String uploadedFilename = fileService.uploadFile(dto.getCrewImgPath(), "/crew");

        // 2. DB 저장 로직 예시 (Crew 엔티티에 맞게 수정 필요)
        Crew crew = Crew.builder()
                .userId(dto.getUserId())
                .gunguId(dto.getGunguId())
                .crewName(dto.getCrewName())
                .crewDescription(dto.getCrewDescription())
                .crewImgPath("/crew/" + uploadedFilename) // 상대 경로 저장
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
