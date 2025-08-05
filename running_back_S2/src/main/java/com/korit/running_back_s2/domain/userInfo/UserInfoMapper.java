package com.korit.running_back_s2.domain.userInfo;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserInfoMapper {
    int insert(UserInfo userInfo);
    UserInfo findByUseEmail(String email);
    UserInfo findById(Integer userId);
}
