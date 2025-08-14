package com.korit.running_back_s2.domain.crew;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CrewMapper {
    List<Crew> findAllBySearchOption(CrewSearchOption crewSearchOption);
    int countBySearchOption(CrewSearchOption crewSearchOption);
}
