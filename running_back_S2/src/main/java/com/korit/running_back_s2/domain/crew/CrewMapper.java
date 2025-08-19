package com.korit.running_back_s2.domain.crew;

import com.korit.running_back_s2.dto.crew.CrewReportRespDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CrewMapper {
    int insert(Crew crew);

    Crew findByCrewName(String crewName);
    Crew findByCrewId(Integer crewId);
    //    int registerProfileImgById(Integer userId, String profileImg);
    List<Crew> findAllBySearchOption(CrewSearchOption crewSearchOption);

    int countBySearchOption(CrewSearchOption crewSearchOption);

    int checkCrew(Integer userId);

    List<CrewReportRespDto> getReportList(Integer crewId);
}