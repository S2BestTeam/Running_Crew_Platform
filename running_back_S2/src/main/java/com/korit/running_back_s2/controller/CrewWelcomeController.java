package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.dto.crew.CrewWelcomeReqDto;
import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.service.CrewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/crews")
@RequiredArgsConstructor
public class CrewWelcomeController {

    private final CrewService crewService;

    @GetMapping("/{crewId}/welcomes")
    public ResponseEntity<ResponseDto<?>> getCrewWelcomes(@PathVariable Integer crewId) {
        return ResponseEntity.ok(ResponseDto.success(crewService.getCrewWelcomes(crewId)));
    }

    @PostMapping("/{crewId}/welcome")
    public ResponseEntity<ResponseDto<?>> registerCrewWelcome(@PathVariable Integer crewId, @RequestBody CrewWelcomeReqDto dto) {
        crewService.registerCrewWelcome(crewId, dto);
        return ResponseEntity.ok(ResponseDto.success("등록성공"));
    }
}
