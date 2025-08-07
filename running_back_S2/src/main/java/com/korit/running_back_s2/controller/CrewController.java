package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.dto.crew.CrewRegisterReqDto;
import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.service.CrewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/crew")
@RequiredArgsConstructor
public class CrewController {

    private final CrewService crewService;

    @PostMapping("/crewName")
    public ResponseEntity<ResponseDto<?>> checkCrewName(@RequestBody Map<String, String> crewNameData) {
        String crewName = crewNameData.get("data");
        System.out.println(crewName);
        return ResponseEntity.ok(ResponseDto.success(crewService.checkCrewNames(crewName)));
    }

    @PostMapping
    public ResponseEntity<ResponseDto<?>> registerCrew(@ModelAttribute CrewRegisterReqDto dto) {
        crewService.register(dto);
        return ResponseEntity.ok(ResponseDto.success("Crew 등록 성공"));
    }
}
