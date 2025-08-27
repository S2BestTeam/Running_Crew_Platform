package com.korit.running_back_s2.domain.gathering;

import com.korit.running_back_s2.domain.user.User;
import com.korit.running_back_s2.dto.gathering.GatheringRespDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface GatheringMapper {
    int insert(Gathering gathering);
    List<Gathering> findAllByCrewId(@Param("crewId") Integer crewId, @Param("userId") Integer userId);
<<<<<<< HEAD
=======
    List<User> findParticipantsByGatheringId(int gatheringId);
>>>>>>> 56-멤버-참석-여부-기능-구현
}
