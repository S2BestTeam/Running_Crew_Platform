package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.service.GunguService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
<<<<<<< HEAD
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
=======
import org.springframework.web.bind.annotation.*;
>>>>>>> origin/14-마이페이지-수정-기능-및-css-작업

@RestController
@RequestMapping("/api/regions")
@RequiredArgsConstructor
public class GunguController {

    private final GunguService gunguService;

    @GetMapping("/gungu")
    public ResponseEntity<ResponseDto<?>> getGunguList() {
        return ResponseEntity.ok(ResponseDto.success(gunguService.getAllGungu()));
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> origin/14-마이페이지-수정-기능-및-css-작업
