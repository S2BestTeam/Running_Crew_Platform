package com.korit.running_back_s2.domain.crewWelcome;

import com.korit.running_back_s2.dto.crew.CrewWelcomeResDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CrewWelComeMapper {
    int insert(CrewWelcome welcome);
    List<CrewWelcomeResDto> findAllByCrewId(Integer crewId);
}
