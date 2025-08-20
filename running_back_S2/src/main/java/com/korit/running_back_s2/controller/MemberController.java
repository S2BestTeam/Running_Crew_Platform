package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.domain.member.Member;
import com.korit.running_back_s2.dto.member.MemberRoleUpdateReqDto;
import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping
    public ResponseEntity<ResponseDto<?>> registerCrewMember(@RequestBody Member member) {
        System.out.println(member);
        memberService.registerMember(member);
        return ResponseEntity.ok(ResponseDto.success("크루 멤버 등록 성공"));
    }

    @GetMapping
    public ResponseEntity<ResponseDto<?>> getCrewMembers(@RequestParam Integer page, @RequestParam Integer size,
                                                         @RequestParam Integer crewId,
                                                         @RequestParam(required = false) String searchText) {
        return ResponseEntity.ok(ResponseDto.success(memberService.getMembers(page, size, crewId, searchText)));
    }

    @GetMapping("/{memberId}")
    public ResponseEntity<?> getMemberDetail(@PathVariable Integer memberId) {

        return ResponseEntity.ok(ResponseDto.success(memberService.getMemberDetail(memberId)));
    }

    @PutMapping("/{memberId}/role")
    public ResponseEntity<?> updateRole(@PathVariable Integer memberId,
                                           @RequestBody MemberRoleUpdateReqDto dto) {
        System.out.println(dto);
        memberService.updateRole(dto);
        return ResponseEntity.ok(ResponseDto.success("권한 변경 완료."));
    }

    @DeleteMapping("/{memberId}")
    public ResponseEntity<?> expel(@PathVariable Integer memberId) {
        memberService.expel(memberId);
        return ResponseEntity.ok(ResponseDto.success("멤버가 추방되었습니다."));
    }
}
