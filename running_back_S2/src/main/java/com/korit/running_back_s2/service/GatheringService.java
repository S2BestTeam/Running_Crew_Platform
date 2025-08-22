package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.gathering.Gathering;
import com.korit.running_back_s2.domain.gathering.GatheringMapper;
import com.korit.running_back_s2.dto.gathering.GatheringRegisterReqDto;
import com.korit.running_back_s2.dto.gathering.GatheringRespDto;
import com.korit.running_back_s2.security.model.PrincipalUtil;
import com.korit.running_back_s2.util.ImageUrlUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GatheringService {

    private final PrincipalUtil principalUtil;
    private final FileService fileService;
    private final GatheringMapper gatheringMapper;
    private final ImageUrlUtil imageUrlUtil;

    @Transactional(rollbackFor = Exception.class)
    public void register(GatheringRegisterReqDto dto) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        String thumbnailImg = fileService.uploadFile(dto.getThumbnailPicture(), "crewGathering");
        Gathering gathering = dto.toEntity();
        gathering.setUserId(userId);
        gathering.setThumbnailPicture(thumbnailImg);

        gatheringMapper.insert(gathering);
    }

    public List<Gathering> getGatherings(Integer crewId) {
        List<Gathering> gatherings = gatheringMapper.findAllByCrewId(crewId);

        gatherings.forEach(g -> {
            if (g.getThumbnailPicture() != null) {
                g.setThumbnailPicture(imageUrlUtil.buildImageUrl(g.getThumbnailPicture(), "crewGathering"));
            }
        });

        return gatherings;
    }

}
