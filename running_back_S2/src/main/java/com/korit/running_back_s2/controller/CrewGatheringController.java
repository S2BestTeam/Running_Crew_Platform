package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.dto.crew.CrewGatheringRegisterReqDto;
import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.service.CrewGatheringService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/crews")
@RequiredArgsConstructor
public class CrewGatheringController {
    private final CrewGatheringService crewGatheringService;

    @PostMapping("/{crewId}/gathering")
    public ResponseEntity<ResponseDto<?>> register(@ModelAttribute CrewGatheringRegisterReqDto dto) {
        System.out.println(dto);
        crewGatheringService.register(dto);
        return ResponseEntity.ok(ResponseDto.success("Crew gathering registered"));
    }
}
