package com.korit.running_back_s2.domain.gathering;

import com.korit.running_back_s2.dto.gathering.GatheringRespDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface GatheringMapper {
    int insert(Gathering gathering);
    List<Gathering> findAllByCrewId(Integer crewId);
}
