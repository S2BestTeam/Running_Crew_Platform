package com.korit.running_back_s2.domain.authUser;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface AuthUserMapper {
    int insert(AuthUser authUser);
    AuthUser findByUsername(String email);
    AuthUser findById(Integer userId);
}
