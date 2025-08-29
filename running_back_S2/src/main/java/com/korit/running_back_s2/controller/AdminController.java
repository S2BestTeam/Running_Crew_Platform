package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.dto.user.UserSearchReqDto;
import com.korit.running_back_s2.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/users")
    public ResponseEntity<ResponseDto<?>> searchUsers(UserSearchReqDto dto) {
        return ResponseEntity.ok(ResponseDto.success(adminService.searchUser(dto)));
    }

    @GetMapping("/crews")
    public ResponseEntity<ResponseDto<?>> getCrews() {
        return ResponseEntity.ok(ResponseDto.success(null));
    }

    @GetMapping("/crews/freeBroads")
    public ResponseEntity<ResponseDto<?>> getFreeBroads() {
        return ResponseEntity.ok(ResponseDto.success(null));
    }

    @GetMapping("/crews/notices")
    public ResponseEntity<ResponseDto<?>> getNotices() {
        return ResponseEntity.ok(ResponseDto.success(null));
    }
}
