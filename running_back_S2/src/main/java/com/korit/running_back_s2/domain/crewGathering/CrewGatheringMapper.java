package com.korit.running_back_s2.domain.crewGathering;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CrewGatheringMapper {
    int insert(CrewGathering crewGathering);
}
