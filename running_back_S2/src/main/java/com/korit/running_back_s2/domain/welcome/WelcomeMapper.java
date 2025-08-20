package com.korit.running_back_s2.domain.welcome;

import com.korit.running_back_s2.dto.welcome.WelcomeReqDto;
import com.korit.running_back_s2.dto.welcome.WelcomeResDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface WelcomeMapper {
    int insert(Welcome welcome);
    List<WelcomeResDto> findAllByCrewId(Integer crewId);
    WelcomeResDto findByCrewIdAndUserId(Integer crewId, Integer userId);
    int deleteWelcomeByUserId(@Param("crewId")Integer crewId,@Param("userId") Integer userId);
    int reject(Welcome welcome);
}
