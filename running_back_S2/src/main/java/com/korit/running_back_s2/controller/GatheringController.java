package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.dto.gathering.GatheringRegisterReqDto;
import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.service.GatheringService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/crews")
@RequiredArgsConstructor
public class GatheringController {

    private final GatheringService gatheringService;

    @GetMapping("/{crewId}/gatherings")
    public ResponseEntity<ResponseDto<?>> getGatherings (@PathVariable Integer crewId) {
        return ResponseEntity.ok(ResponseDto.success(gatheringService.getGatherings(crewId)));
    }

    @PostMapping("/{crewId}/gatherings")
    public ResponseEntity<ResponseDto<?>> register(@ModelAttribute GatheringRegisterReqDto dto) {
        System.out.println(dto);
        gatheringService.register(dto);
        return ResponseEntity.ok(ResponseDto.success("Crew gathering registered"));
    }
}
