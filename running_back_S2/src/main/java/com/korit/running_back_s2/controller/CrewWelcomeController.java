package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.dto.crew.CrewWelcomeReqDto;
import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.service.CrewWelcomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/crews")
@RequiredArgsConstructor
public class CrewWelcomeController {

    private final CrewWelcomeService crewWelcomeService;

    @GetMapping("/{crewId}/welcomes")
    public ResponseEntity<ResponseDto<?>> getCrewWelcomes(@PathVariable Integer crewId) {
        return ResponseEntity.ok(ResponseDto.success(crewWelcomeService.getCrewWelcomes(crewId)));
    }

    @PostMapping("/{crewId}/welcome")
    public ResponseEntity<ResponseDto<?>> registerCrewWelcome(@PathVariable Integer crewId, @RequestBody CrewWelcomeReqDto dto) {
        crewWelcomeService.registerCrewWelcome(crewId, dto);
        return ResponseEntity.ok(ResponseDto.success("등록성공"));
    }
}
