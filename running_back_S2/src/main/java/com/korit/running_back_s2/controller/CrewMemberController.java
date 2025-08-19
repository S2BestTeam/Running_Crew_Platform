package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.domain.crew.member.CrewMember;
import com.korit.running_back_s2.dto.crew.CrewRegisterReqDto;
import com.korit.running_back_s2.dto.crew.CrewReportReqDto;
import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.security.model.PrincipalUser;
import com.korit.running_back_s2.service.CrewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/crews")
@RequiredArgsConstructor
public class CrewMemberController {

    private final CrewService crewService;

    @PostMapping("/{crewId}/member")
    public ResponseEntity<ResponseDto<?>> registerCrewMember(@RequestBody CrewMember dto) {
        System.out.println(dto);
        crewService.registerCrewMember(dto);
        return ResponseEntity.ok(ResponseDto.success("크루 멤버 등록 성공"));
    }

    @GetMapping("/{crewId}/members")
    public ResponseEntity<ResponseDto<?>> getCrewMembers(@RequestParam Integer page, @RequestParam Integer size,
                                                         @PathVariable Integer crewId,
                                                         @RequestParam(required = false) String searchText) {
        return ResponseEntity.ok(ResponseDto.success(crewService.getMembers(page, size, crewId, searchText)));
    }

    @GetMapping("/{crewId}/members/{userId}")
    public ResponseEntity<?> getMemberDetail(@PathVariable Integer crewId, @PathVariable Integer userId) {
        return ResponseEntity.ok(ResponseDto.success(crewService.getMemberDetail(crewId, userId)));
    }

    @PutMapping("/{crewId}/members/{userId}/grant")
    public ResponseEntity<?> grant(@PathVariable Integer crewId,
                                           @PathVariable Integer userId) {
        crewService.grant(crewId, userId);
        return ResponseEntity.ok(ResponseDto.success("운영진으로 올렸습니다"));
    }

    @PutMapping("/{crewId}/members/{userId}/down")
    public ResponseEntity<?> down(@PathVariable Integer crewId,
                                   @PathVariable Integer userId) {
        crewService.down(crewId, userId);
        return ResponseEntity.ok(ResponseDto.success("운영진에서 박탈되었습니다."));
    }



    @DeleteMapping("/{crewId}/members/{userId}/expel")
    public ResponseEntity<?> expel(@PathVariable Integer crewId,
                                         @PathVariable Integer userId) {
        crewService.expel(crewId, userId);
        return ResponseEntity.ok(ResponseDto.success("멤버가 추방되었습니다."));
    }

    @PostMapping("/{crewId}/members/{userId}/report")
    public ResponseEntity<?> report(
            @PathVariable Integer crewId,
            @PathVariable Integer userId,
            @RequestBody CrewReportReqDto dto,
            @AuthenticationPrincipal PrincipalUser principalUser) {

        crewService.report(crewId, userId, principalUser, dto.getReason());
        return ResponseEntity.ok(ResponseDto.success("신고가 접수되었습니다."));
    }

    @GetMapping("/{crewId}/members/report")
    public ResponseEntity<?> getReportList(@PathVariable Integer crewId) {
        return ResponseEntity.ok(ResponseDto.success(crewService.getReportList(crewId)));
    }
}
