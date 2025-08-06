package com.korit.running_back_s2.domain.user;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    int insert(User userInfo);
    User findByUsername(String email);
    User findById(Integer userId);
}
