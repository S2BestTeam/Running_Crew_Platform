package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.domain.user.User;
import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.dto.user.UserMyPageUpdateReqDto;
import com.korit.running_back_s2.dto.user.UserRegisterReqDto;
import com.korit.running_back_s2.security.model.PrincipalUser;
import com.korit.running_back_s2.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/users")
    public ResponseEntity<ResponseDto<?>> register(@RequestBody UserRegisterReqDto dto) {
        return ResponseEntity.ok(ResponseDto.success(userService.register(dto)));
    }

    @PostMapping("/users/nickname")
    public ResponseEntity<ResponseDto<?>> checkNickname(@RequestBody Map<String, String> nicknameData) {
        String nickname = nicknameData.get("data");
        System.out.println(nickname);
        return ResponseEntity.ok(ResponseDto.success(userService.checkNickname(nickname)));
<<<<<<< HEAD
=======
    }

    @GetMapping("/mypage")
    public ResponseEntity<User> getMyPage(@AuthenticationPrincipal PrincipalUser principalUser) {
        User user = userService.getMyPage(principalUser.getUser().getUserId());

        return ResponseEntity.ok(user);
    }

    @PostMapping("/users/{userId}/img")
    public ResponseEntity<ResponseDto<?>> updateUserInfo(@RequestPart MultipartFile file) {
        System.out.println(file.getOriginalFilename());
        return ResponseEntity.ok(ResponseDto.success("수정 완료"));
    }

    @PutMapping("/users/{userId}")
    public ResponseEntity<ResponseDto<?>> updateUserInfo(@RequestBody UserMyPageUpdateReqDto dto) {
        userService.updateMyPage(dto);
        System.out.println(dto);
        return ResponseEntity.ok(ResponseDto.success("수정 완료"));
>>>>>>> origin/10-mypage-데이터-불러오기-및-프로필-수정-설계
    }
}
