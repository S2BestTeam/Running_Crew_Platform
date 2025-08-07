package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.user.User;
import com.korit.running_back_s2.domain.user.UserMapper;
import com.korit.running_back_s2.dto.user.UserRegisterReqDto;
import com.korit.running_back_s2.security.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserMapper userMapper;
    private final JwtUtil jwtUtil;

    public Map<String, String> register(UserRegisterReqDto dto) {
        User user = dto.Entity();
        userMapper.insert(user);
        String accessToken = jwtUtil.generateAccessToken(user);

        Map<String, String> result = new HashMap<>();
        result.put("accessToken", accessToken);
        return result;
    }


    public String checkNickname(String nickname) {
        User user = userMapper.findByNickname(nickname);
        if (user == null) {
            return "false";  // 사용 가능한 닉네임
        } else {
            return "true";   // 중복된 닉네임
        }
    }

    public User getMyPage(Integer userId) {
        User user = userMapper.findById(userId);
        return user;
    }

    @Transactional(rollbackFor = Exception.class)
    public void updateMyPage(UserMyPageUpdateReqDto dto) {
        User user = dto.Entity();
        userMapper.update(user);
    }
}
