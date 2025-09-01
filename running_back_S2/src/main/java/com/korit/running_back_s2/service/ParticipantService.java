package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.gathering.GatheringMapper;
import com.korit.running_back_s2.domain.gathering.ParticipantMapper;
import com.korit.running_back_s2.domain.user.UserMapper;
import com.korit.running_back_s2.dto.participant.ParticipantAttendanceUpdateDto;
import com.korit.running_back_s2.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ParticipantService {

    private final ParticipantMapper participantMapper;
    private final PrincipalUtil principalUtil;
    private final GatheringMapper gatheringMapper;
    private final UserMapper userMapper;

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

    @Transactional
    public void updateParticipantsAttendance(Integer gatheringId, List<ParticipantAttendanceUpdateDto> list) {
        double gatheringKm = gatheringMapper.getKmById(gatheringId);

        for (ParticipantAttendanceUpdateDto dto : list) {
            // 1) 현재 DB 상태 조회
            Integer currentStatus = participantMapper.getAttendanceStatusById(gatheringId, dto.getUserId());

            // 2) km 업데이트 로직 (상태 변화가 있을 때만 적용)
            if (currentStatus != null) {
                if (currentStatus == 0 && dto.getAttendanceStatus() == 1) {
                    // 불참 → 참석 → km 더하기
                    userMapper.updateUserKm(dto.getUserId(), gatheringKm);
                } else if (currentStatus == 1 && dto.getAttendanceStatus() == 0) {
                    // 참석 → 불참 → km 빼기
                    userMapper.updateUserKm(dto.getUserId(), -gatheringKm);
                }
            }
        }

        // 3) 상태 업데이트 (배치 업데이트)
        int updated = participantMapper.updateAttendance(gatheringId, list);
        System.out.println("=== 업데이트된 행 수 : " + updated);
    }

}
