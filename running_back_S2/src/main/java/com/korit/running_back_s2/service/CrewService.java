package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.crew.Crew;
import com.korit.running_back_s2.domain.crew.CrewMapper;
import com.korit.running_back_s2.dto.crew.CrewRegisterReqDto;
import com.korit.running_back_s2.dto.crew.CrewSearchReqDto;
import com.korit.running_back_s2.dto.crew.CrewSearchRespDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CrewService {

    private final CrewMapper crewMapper;
    private final FileService fileService;

    public void register(CrewRegisterReqDto dto) {
        String uploadedFilename = fileService.uploadFile(dto.getCrewImgPath(), "/crew");
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

    public Crew getCrew(Integer crewId) {
        return crewMapper.findByCrewId(crewId);
    }

    // 크루 리스트 조회 (검색 옵션 적용)
    public CrewSearchRespDto searchCrew(CrewSearchReqDto dto) {
        Integer totalElements = crewMapper.getCountOfOptions(dto.toOption());
        Integer totalPages = (int) Math.ceil(totalElements.doubleValue() / dto.getSize().doubleValue());
        List<Crew> crews = crewMapper.findAllBySearchOption(dto.toOption());
        boolean isLast = dto.getPage().equals(totalPages);
        return CrewSearchRespDto.builder()
                .contents(crews)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .page(dto.getPage())
                .size(dto.getSize())
                .isLast(isLast)
                .build();
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
