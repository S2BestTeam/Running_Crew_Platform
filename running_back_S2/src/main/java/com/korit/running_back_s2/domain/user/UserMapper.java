package com.korit.running_back_s2.domain.user;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    int insert(User userInfo);
    User findByEmail(String email);
    User findById(Integer userId);
    User findByNickname(String nickname);
<<<<<<< HEAD
=======

    int update(User user);
>>>>>>> origin/10-mypage-데이터-불러오기-및-프로필-수정-설계
}
