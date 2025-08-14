package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.gungu.GunguMapper;
import com.korit.running_back_s2.domain.user.User;
import com.korit.running_back_s2.domain.user.UserMapper;
import com.korit.running_back_s2.dto.user.UserRegisterReqDto;
import com.korit.running_back_s2.security.jwt.JwtUtil;
import com.korit.running_back_s2.security.model.PrincipalUser;
import com.korit.running_back_s2.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {

    private final JwtUtil jwtUtil;
    private final UserMapper userMapper;
    private final GunguMapper gunguMapper;
    private final FileService fileService;
    private final PrincipalUtil principalUtil;

    public Map<String, String> register(UserRegisterReqDto dto) {
        User user = dto.toEntity();

        String[] parts = user.getAddress().split(" ");
        String gunguName = parts.length > 1 ? parts[1] : "";

        Integer gunguId = gunguMapper.findGunguIdByName(gunguName);
        user.setGunguId(gunguId);
        userMapper.insert(user);
        // 이 과정으로 프론트에서는 address 라는 값만 받아오지만 백엔드에서 address의 지역구 부분을 잘라서 gungu_tb에 name과 동일한
        // gunguName의 Id 를 다시 대입!, 그럼 DB에 gunguId 와 address 라는 두개의 컬럼이 존재
        // gunguId를 통해 사용자의 현재 지역구 위주의 기타 사항들을 서칭 할 수 있게 가능해짐! - 일단 이정도?

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

//    public User getMyPage(Integer userId) {
//        User user = userMapper.findById(userId);
//        return user;
//    }
//
//    @Transactional(rollbackFor = Exception.class)
//    public void updateUserProfileImg(MultipartFile file) {
//        PrincipalUser principalUser = (PrincipalUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        String fileName = fileService.uploadFile(file, "/profile");
//        userMapper.updateProfileImgById(principalUser.getUser().getUserId(), fileName);
//    }
}