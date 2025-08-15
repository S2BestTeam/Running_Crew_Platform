package com.korit.running_back_s2.domain.crew;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CrewMapper {
    int insert(Crew crew);
    Crew findByCrewName(String crewName);
    Crew findByCrewId(Integer crewId);
}