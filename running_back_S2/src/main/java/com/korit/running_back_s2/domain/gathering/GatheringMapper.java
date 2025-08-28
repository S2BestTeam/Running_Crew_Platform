package com.korit.running_back_s2.domain.gathering;

import com.korit.running_back_s2.domain.user.User;
import com.korit.running_back_s2.dto.gathering.GatheringRegisterReqDto;
import com.korit.running_back_s2.dto.gathering.GatheringRespDto;
import com.korit.running_back_s2.dto.gathering.GatheringUpdateReqDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface GatheringMapper {
    int insert(Gathering gathering);
    List<Gathering> findAllByCrewId(@Param("crewId") Integer crewId, @Param("userId") Integer userId);
    List<User> findParticipantsByGatheringId(int gatheringId);

    int update(Gathering gathering);

    List<Gathering> findByGatheringId(Integer gatheringId);
}
