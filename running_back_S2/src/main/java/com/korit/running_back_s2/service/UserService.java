package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.userInfo.UserInfo;
import com.korit.running_back_s2.domain.userInfo.UserInfoMapper;
import com.korit.running_back_s2.dto.user.UserRegisterReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserInfoMapper userInfoMapper;

    public void register(UserRegisterReqDto dto) {
        UserInfo user = dto.Entity();
        userInfoMapper.insert(user);
    }
}