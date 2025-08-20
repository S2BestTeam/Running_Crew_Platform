package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.gathering.Gathering;
import com.korit.running_back_s2.domain.gathering.GatheringMapper;
import com.korit.running_back_s2.dto.gathering.GatheringRegisterReqDto;
import com.korit.running_back_s2.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class GatheringService {

    private final PrincipalUtil principalUtil;
    private final FileService fileService;
    private final GatheringMapper gatheringMapper;

    @Transactional(rollbackFor = Exception.class)
    public void register(GatheringRegisterReqDto dto) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        String thumbnailImg = fileService.uploadFile(dto.getThumbnailPicture(), "/crew/gathering");
        Gathering gathering = dto.toEntity();
        gathering.setUserId(userId);
        gathering.setThumbnailPicture(thumbnailImg);

        gatheringMapper.insert(gathering);
    }

}
