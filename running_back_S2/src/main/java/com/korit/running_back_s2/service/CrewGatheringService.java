package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.crew.Crew;
import com.korit.running_back_s2.domain.crew.CrewMapper;
import com.korit.running_back_s2.domain.crew.CrewSearchOption;
import com.korit.running_back_s2.domain.crewGathering.CrewGathering;
import com.korit.running_back_s2.domain.crewGathering.CrewGatheringMapper;
import com.korit.running_back_s2.domain.user.UserMapper;
import com.korit.running_back_s2.dto.crew.CrewGatheringRegisterReqDto;
import com.korit.running_back_s2.dto.crew.CrewGatheringRespDto;
import com.korit.running_back_s2.dto.crew.CrewRegisterReqDto;
import com.korit.running_back_s2.dto.response.PaginationRespDto;
import com.korit.running_back_s2.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CrewGatheringService {

    private final PrincipalUtil principalUtil;
    private final FileService fileService;
    private final CrewGatheringMapper crewGatheringMapper;

    public List<CrewGatheringRespDto> getGatherings(Integer crewId) {
        return crewGatheringMapper.findAllByCrewId(crewId);
    }

    @Transactional(rollbackFor = Exception.class)
    public void register(CrewGatheringRegisterReqDto dto) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        String thumbnailImg = fileService.uploadFile(dto.getThumbnailPicture(), "/crew/gathering");
        CrewGathering crewGathering = dto.toEntity();
        crewGathering.setUserId(userId);
        crewGathering.setThumbnailPicture(thumbnailImg);

        crewGatheringMapper.insert(crewGathering);
    }

}
