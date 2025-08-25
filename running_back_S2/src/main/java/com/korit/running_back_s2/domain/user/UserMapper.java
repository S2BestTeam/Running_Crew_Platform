package com.korit.running_back_s2.domain.user;

import com.korit.running_back_s2.dto.ranking.CrewRankingRespDto;
import com.korit.running_back_s2.dto.ranking.UserRankingRespDto;
import com.korit.running_back_s2.dto.report.ReportReqDto;
import com.korit.running_back_s2.dto.welcome.WelcomeByUserIdResDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {
    int insert(User userInfo);
    User findByEmail(String email);
    User findById(Integer userId);
    User findByNickname(String nickname);
    int updateProfileImgById(Integer userId, String picture);
    String findPictureById(Integer userId);
    List<WelcomeByUserIdResDto> findWelcomeByUserId(Integer userId);
    int updateUser(User user);

    List<UserRankingRespDto> selectUserRankingByTotalKm();
    List<UserRankingRespDto> selectUserRankingByGatheringCount();

}
