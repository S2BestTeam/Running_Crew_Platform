package com.korit.running_back_s2.domain.userInfo;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserInfoMapper {
    int insert(UserInfo userInfo);
    UserInfo findByUsername(String email);
    UserInfo findById(Integer userId);
}
