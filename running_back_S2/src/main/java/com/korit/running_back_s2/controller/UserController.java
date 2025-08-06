package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.dto.user.UserRegisterReqDto;
import com.korit.running_back_s2.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    }
}
