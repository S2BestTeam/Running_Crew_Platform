package com.korit.running_back_s2.domain.gathering;

import com.korit.running_back_s2.dto.gathering.GatheringRespDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface GatheringMapper {
    int insert(Gathering gathering);
<<<<<<< HEAD
    List<Gathering> findAllByCrewId(Integer crewId);
=======
    List<Gathering> findAllByCrewId(@Param("crewId") Integer crewId, @Param("userId") Integer userId);
>>>>>>> origin/정모-일정-등록-수정중
}
