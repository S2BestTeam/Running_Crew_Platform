package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.dto.user.UserRegisterReqDto;
import com.korit.running_back_s2.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/users")
    public ResponseEntity<ResponseDto<?>> register(@RequestBody UserRegisterReqDto dto) {
        System.out.println(dto);
        return ResponseEntity.ok(ResponseDto.success(userService.register(dto)));
    }

    @GetMapping("/users/nickname/check")
    public ResponseEntity<ResponseDto<?>> checkNickname(@RequestParam String nickname) {
        return ResponseEntity.ok(ResponseDto.success(userService.checkNickname(nickname)));
    }


    @GetMapping("/{userId}/reports")
    public  ResponseEntity<ResponseDto<?>> getReports(@PathVariable Integer userId) {
        return ResponseEntity.ok(ResponseDto.success(userService.getReport(userId)));
    }

    @GetMapping("/{userId}/mypage/")
    public ResponseEntity<ResponseDto<?>> getUserWelcome(@PathVariable Integer userId) {
        return ResponseEntity.ok(ResponseDto.success(userService.getWelcomeByUserId(userId)));
    }

    @PostMapping("/{userId}/picture")
    public ResponseEntity<ResponseDto<?>> updateUserProfile(@RequestPart("profileFile") MultipartFile profileFile,
                                                            @PathVariable Integer userId) {
        userService.updateUserProfileImg(userId, profileFile);
        return ResponseEntity.ok(ResponseDto.success("수정 완료"));
    }

//    @PutMapping("/users/{userId}")
//    public ResponseEntity<ResponseDto<?>> updateUserInfo(@RequestBody UserMyPageUpdateReqDto dto) {
//        userService.updateMyPage(dto);
//        System.out.println(dto);
//        return ResponseEntity.ok(ResponseDto.success("수정 완료"));
//    }
}
