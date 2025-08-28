package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.gathering.Gathering;
import com.korit.running_back_s2.domain.gathering.GatheringMapper;
import com.korit.running_back_s2.domain.gathering.ParticipantMapper;
import com.korit.running_back_s2.domain.user.User;
import com.korit.running_back_s2.dto.gathering.GatheringRegisterReqDto;
import com.korit.running_back_s2.dto.gathering.GatheringUpdateReqDto;
import com.korit.running_back_s2.security.model.PrincipalUtil;
import com.korit.running_back_s2.util.ImageUrlUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GatheringService {

    private final PrincipalUtil principalUtil;
    private final FileService fileService;
    private final GatheringMapper gatheringMapper;
    private final ImageUrlUtil imageUrlUtil;
    private final ParticipantMapper participantMapper;

    @Transactional(rollbackFor = Exception.class)
    public void register(GatheringRegisterReqDto dto) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        String thumbnailImg = fileService.uploadFile(dto.getThumbnailPicture(), "crewGathering");
        Gathering gathering = dto.toEntity();
        gathering.setUserId(userId);
        gathering.setThumbnailPicture(thumbnailImg);

        gatheringMapper.insert(gathering);
        participantMapper.insert(gathering.getGatheringId(), userId);

    }

    public List<Gathering> getGatherings(Integer crewId) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        List<Gathering> gatherings = gatheringMapper.findAllByCrewId(crewId, userId);
        gatherings.forEach(g -> {
            if (g.getThumbnailPicture() != null) {
                g.setThumbnailPicture(imageUrlUtil.buildImageUrl(g.getThumbnailPicture(), "crewGathering"));
            }
        });

        return gatherings;
    }

    public List<User> getGatheringParticipants(int gatheringId) {
        return gatheringMapper.findParticipantsByGatheringId(gatheringId);
    }

    @Transactional(rollbackFor = Exception.class)
    public void updateGathering(Integer gatheringId, GatheringUpdateReqDto dto) {

        Gathering gathering = dto.toEntity();

        if (dto.getThumbnailPicture() != null && !dto.getThumbnailPicture().isEmpty()) {
            final String UPLOAD_PATH = "crewGathering";

            String newFileName = fileService.uploadFile(dto.getThumbnailPicture(), UPLOAD_PATH);
            String thumbnailImg = UPLOAD_PATH + "/" + newFileName;
            gathering.setThumbnailPicture(thumbnailImg);

            fileService.deleteFile(UPLOAD_PATH, dto.getOldFilePath());
        }

        gatheringMapper.update(gathering);
    }

    public List<Gathering> getGatheringDetail(Integer gatheringId) {
        return gatheringMapper.findByGatheringId(gatheringId);
    }
}
