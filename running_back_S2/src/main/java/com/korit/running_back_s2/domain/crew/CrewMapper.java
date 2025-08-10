package com.korit.running_back_s2.domain.crew;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CrewMapper {
    int insert(Crew crew);
    Crew findByCrewName(String crewName);
    List<Crew> findAllBySearchOption(CrewSearchOption searchOption);
    Integer getCountOfOptions(CrewSearchOption searchOption);
    Crew findByCrewId(Integer crewId);
<<<<<<< HEAD
}
=======
}



>>>>>>> origin/14-마이페이지-수정-기능-및-css-작업
