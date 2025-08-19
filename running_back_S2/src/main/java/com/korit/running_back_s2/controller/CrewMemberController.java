package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.domain.crew.member.CrewMember;
import com.korit.running_back_s2.dto.crew.CrewMemberRoleUpdateReqDto;
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
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class CrewMemberController {

    private final CrewService crewService;

    @PostMapping
    public ResponseEntity<ResponseDto<?>> registerCrewMember(@RequestBody CrewMember dto) {
        System.out.println(dto);
        crewService.registerCrewMember(dto);
        return ResponseEntity.ok(ResponseDto.success("크루 멤버 등록 성공"));
    }

    @GetMapping
    public ResponseEntity<ResponseDto<?>> getCrewMembers(@RequestParam Integer page, @RequestParam Integer size,
                                                         @RequestParam Integer crewId,
                                                         @RequestParam(required = false) String searchText) {
        return ResponseEntity.ok(ResponseDto.success(crewService.getMembers(page, size, crewId, searchText)));
    }

    @GetMapping("/{memberId}")
    public ResponseEntity<?> getMemberDetail(@PathVariable Integer memberId) {
        return ResponseEntity.ok(ResponseDto.success(crewService.getMemberDetail(memberId)));
    }

    @PutMapping("/{memberId}/role")
    public ResponseEntity<?> updateRole(@PathVariable Integer memberId,
                                           @RequestBody CrewMemberRoleUpdateReqDto dto) {
        crewService.updateRole(dto);
        return ResponseEntity.ok(ResponseDto.success("권한 변경 완료."));
    }

    @DeleteMapping("/{memberId}")
    public ResponseEntity<?> expel(@PathVariable Integer memberId) {
        crewService.expel(memberId);
        return ResponseEntity.ok(ResponseDto.success("멤버가 추방되었습니다."));
    }
}
