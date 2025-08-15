package com.korit.running_back_s2.domain.crew;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CrewMapper {
    int insert(Crew crew);

    Crew findByCrewName(String crewName);
<<<<<<< HEAD
    Crew findByCrewId(Integer crewId);
=======

    Crew findByCrewId(Integer crewId);

    //    int registerProfileImgById(Integer userId, String profileImg);
    List<Crew> findAllBySearchOption(CrewSearchOption crewSearchOption);

    int countBySearchOption(CrewSearchOption crewSearchOption);
>>>>>>> da92693031fc45e21e10cf2b9c0f3d1466d4c09c
}