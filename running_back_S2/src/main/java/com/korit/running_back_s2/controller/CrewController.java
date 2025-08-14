package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.dto.response.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.korit.running_back_s2.dto.crew.CrewRegisterReqDto;
import com.korit.running_back_s2.service.CrewService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/crews")
@RequiredArgsConstructor
public class CrewController {

    private final CrewService crewService;

    @GetMapping("/{crewId}")
    public ResponseEntity<ResponseDto<?>> getCrewById (@PathVariable Integer crewId) {
        return ResponseEntity.ok(ResponseDto.success(null));
    }

    @PostMapping
    public ResponseEntity<ResponseDto<?>> registerCrew(@ModelAttribute CrewRegisterReqDto dto) {
        crewService.register(dto);
        return ResponseEntity.ok(ResponseDto.success("Crew 등록 성공"));
    }

    @PostMapping("/crewName")
    public ResponseEntity<ResponseDto<?>> checkCrewName(@RequestBody Map<String, String> crewNameData) {
        String crewName = crewNameData.get("data");
        System.out.println(crewName);
        return ResponseEntity.ok(ResponseDto.success(crewService.checkCrewNames(crewName)));
    }
}
