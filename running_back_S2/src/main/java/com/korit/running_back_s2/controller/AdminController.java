package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.dto.user.UserSearchReqDto;
import com.korit.running_back_s2.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/users")
    public ResponseEntity<ResponseDto<?>> searchUsers(UserSearchReqDto dto) {
        return ResponseEntity.ok(ResponseDto.success(adminService.searchUser(dto)));
    }

    @DeleteMapping("/reports/{reportId}")
    public ResponseEntity<ResponseDto<?>> deleteReport (@PathVariable Integer reportId) {
        adminService.deleteReport(reportId);
        return ResponseEntity.ok(ResponseDto.success("삭제 성공"));
    }

    @GetMapping("/{userId}/post")
    public ResponseEntity<ResponseDto<?>> getPost(Integer userId) {
        return ResponseEntity.ok(ResponseDto.success(null));
    }
}
