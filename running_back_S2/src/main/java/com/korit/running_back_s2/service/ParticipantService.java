package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.gathering.GatheringMapper;
import com.korit.running_back_s2.domain.gathering.ParticipantMapper;
import com.korit.running_back_s2.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ParticipantService {

    private final ParticipantMapper participantMapper;
    private final PrincipalUtil principalUtil;
    private final GatheringMapper gatheringMapper;

    @Transactional
    public void attendGathering(Integer gatheringId) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();

        boolean exists = participantMapper.existsByGatheringIdAndUserId(gatheringId, userId);
        if (!exists) {
            participantMapper.insert(gatheringId, userId);
        }

    }

    @Transactional
    public int cancelAttendance(Integer gatheringId) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        participantMapper.deleteByGatheringIdAndUserId(gatheringId, userId);

        return participantMapper.countByGatheringId(gatheringId);
    }

    public int getParticipantCount(Integer gatheringId) {
        return participantMapper.countByGatheringId(gatheringId);
    }
}
