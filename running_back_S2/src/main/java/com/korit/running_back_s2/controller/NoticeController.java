package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.dto.notice.NoticeReqDto;
import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notices")
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;

    @PostMapping("/{crewId}")
    public ResponseEntity<ResponseDto<?>> registerCrewNotice(@PathVariable Integer crewId, @RequestBody NoticeReqDto dto) {
        noticeService.register(crewId, dto);
        return ResponseEntity.ok(ResponseDto.success("등록성공"));

    }
}
