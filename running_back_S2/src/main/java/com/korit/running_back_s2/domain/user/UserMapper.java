package com.korit.running_back_s2.domain.user;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    int insert(User userInfo);
    User findByEmail(String email);
    User findById(Integer userId);
    User findByNickname(String nickname);
    int updateProfileImgById(Integer userId, String profileImg);
<<<<<<< HEAD
}
=======
}
>>>>>>> origin/14-마이페이지-수정-기능-및-css-작업
