package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.dto.crew.CrewGatheringRegisterReqDto;
import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.service.CrewGatheringService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/crews")
@RequiredArgsConstructor
public class CrewGatheringController {
    private final CrewGatheringService crewGatheringService;

    @GetMapping("/{crewId}/gatherings")
    public ResponseEntity<ResponseDto<?>> getGatherings (@PathVariable Integer crewId) {
        return ResponseEntity.ok(ResponseDto.success(crewGatheringService.getGatherings(crewId)));
    }

    @PostMapping("/{crewId}/gatherings")
    public ResponseEntity<ResponseDto<?>> register(@ModelAttribute CrewGatheringRegisterReqDto dto) {
        System.out.println(dto);
        crewGatheringService.register(dto);
        return ResponseEntity.ok(ResponseDto.success("Crew gathering registered"));
    }
}
