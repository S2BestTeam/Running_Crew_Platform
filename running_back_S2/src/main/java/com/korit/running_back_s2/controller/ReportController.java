package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.dto.report.ReportReqDto;
import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @PostMapping("/crews")
    public ResponseEntity<?> report(@RequestBody ReportReqDto dto) {
        System.out.println(dto.getUserId());
        reportService.report(dto);
        return ResponseEntity.ok(ResponseDto.success("신고가 접수되었습니다."));
    }

    @GetMapping("/crews")
    public ResponseEntity<?> getReportList(@PathVariable Integer crewId) {
        return ResponseEntity.ok(ResponseDto.success(reportService.getReportList(crewId)));
    }
}
