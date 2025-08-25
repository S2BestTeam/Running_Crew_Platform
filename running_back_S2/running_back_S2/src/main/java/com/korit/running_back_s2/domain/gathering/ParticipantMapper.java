package com.korit.running_back_s2.domain.gathering;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface ParticipantMapper {
    
    int insert(@Param("gatheringId") Integer gatheringId, @Param("userId") Integer userId);

    int deleteByGatheringIdAndUserId(@Param("gatheringId") Integer gatheringId, @Param("userId") Integer userId);

    int countByGatheringId(@Param("gatheringId") Integer gatheringId);

    boolean existsByGatheringIdAndUserId(Integer gatheringId, Integer userId);
}
