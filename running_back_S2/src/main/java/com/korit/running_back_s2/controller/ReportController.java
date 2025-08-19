package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.domain.crew.member.CrewMember;
import com.korit.running_back_s2.dto.crew.CrewMemberRoleUpdateReqDto;
import com.korit.running_back_s2.dto.crew.CrewReportReqDto;
import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.security.model.PrincipalUser;
import com.korit.running_back_s2.service.CrewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {

    private final CrewService crewService;

    @PostMapping
    public ResponseEntity<?> report(@RequestBody CrewReportReqDto dto) {
        crewService.report(dto);
        return ResponseEntity.ok(ResponseDto.success("신고가 접수되었습니다."));
    }

    @GetMapping
    public ResponseEntity<?> getReportList(@RequestParam Integer crewId) {
        return ResponseEntity.ok(ResponseDto.success(crewService.getReportList(crewId)));
    }
}
