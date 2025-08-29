package com.korit.running_back_s2.domain.gathering;

import com.korit.running_back_s2.domain.user.User;
<<<<<<< HEAD
import com.korit.running_back_s2.dto.gathering.GatheringRespDto;
import com.korit.running_back_s2.dto.user.UserGatheringsReqDto;
=======
>>>>>>> d836702712a35554ee595ef96568af59d4b367be
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface GatheringMapper {
    int insert(Gathering gathering);
    List<Gathering> findAllByCrewId(@Param("crewId") Integer crewId, @Param("userId") Integer userId);
    List<User> findParticipantsByGatheringId(int gatheringId);

<<<<<<< HEAD
    List<UserGatheringsReqDto> findGatheringByUserId(Integer userId);
=======
    int update(Gathering gathering);

    Gathering findByGatheringId(Integer gatheringId);
>>>>>>> d836702712a35554ee595ef96568af59d4b367be
}
