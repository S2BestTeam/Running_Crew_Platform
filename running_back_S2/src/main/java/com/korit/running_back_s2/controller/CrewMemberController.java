package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.domain.crewMember.CrewMember;
import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.service.CrewMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/crew")
@RequiredArgsConstructor
public class CrewMemberController {

    private final CrewMemberService crewMemberService;

    @PostMapping("/{crewId}/member")
    public ResponseEntity<ResponseDto<?>> registerCrewMember(@RequestBody CrewMember dto) {
        System.out.println(dto);
        crewMemberService.registerCrewMember(dto);
        return ResponseEntity.ok(ResponseDto.success("크루 멤버 등록 성공"));
    }
}
