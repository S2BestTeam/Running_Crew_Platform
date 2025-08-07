package com.korit.running_back_s2.domain.crew;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CrewMapper {


    List<Crew> findAllBySearchOption(CrewSearchOption searchOption);
    Integer getCountOfOptions(CrewSearchOption searchOption);
    Crew findByCrewId(Integer crewId);

}



