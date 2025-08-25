package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.gathering.Participant;
import com.korit.running_back_s2.domain.gathering.ParticipantMapper;
import com.korit.running_back_s2.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ParticipantService {

    private final ParticipantMapper participantMapper;
    private final PrincipalUtil principalUtil;

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
        participantMapper.deleteByGatheringIdAndUserId(gatheringId, userId); // 참석자 삭제
        return participantMapper.countByGatheringId(gatheringId); // 현재 참석자 수 반환
    }

    public int getParticipantCount(Integer gatheringId) {
        return participantMapper.countByGatheringId(gatheringId);
    }
}
