package com.korit.running_back_s2.domain.user;

import com.korit.running_back_s2.dto.response.ReportResDto;
import com.korit.running_back_s2.dto.response.WelcomeByUserIdResDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserMapper {
    int insert(User userInfo);
    User findByEmail(String email);
    User findById(Integer userId);
    User findByNickname(String nickname);
//    int updateProfileImgById(Integer userId, String profileImg);
    List<WelcomeByUserIdResDto> findWelcomeByUserId(Integer userId);
    List<ReportResDto> findReportsByUserId(Integer userId);

    void insertLeaderRole(Integer userId, Integer crewId);
}
