package com.korit.running_back_s2.domain.crewGathering;

import com.korit.running_back_s2.dto.crew.CrewGatheringRespDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CrewGatheringMapper {
    int insert(CrewGathering crewGathering);

    List<CrewGatheringRespDto> findAllByCrewId(Integer crewId);
}
