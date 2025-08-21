package com.korit.running_back_s2.domain.welcome;

import com.korit.running_back_s2.dto.member.ExistsCheckReqDto;
import com.korit.running_back_s2.dto.welcome.WelcomeResDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface WelcomeMapper {
    int insert(Welcome welcome);
    List<WelcomeResDto> findAllByCrewId(Integer crewId);
    Welcome findByUserId(Welcome welcome);
    boolean existsFind(ExistsCheckReqDto dto);
}
