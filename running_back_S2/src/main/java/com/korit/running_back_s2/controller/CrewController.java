package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.dto.crew.CrewRegisterReqDto;
import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.dto.response.crew.CrewSearchReqDto;
import com.korit.running_back_s2.dto.response.crew.CrewSearchRespDto;
import com.korit.running_back_s2.service.CrewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/crews")
@RequiredArgsConstructor
public class CrewController {

    private final CrewService crewService;

    @PostMapping("/crewName")
    public ResponseEntity<ResponseDto<?>> checkCrewName(@RequestBody Map<String, String> crewNameData) {
        String crewName = crewNameData.get("data");
        System.out.println(crewName);
        return ResponseEntity.ok(ResponseDto.success(crewService.checkCrewNames(crewName)));
    }
    @GetMapping
    public ResponseEntity<ResponseDto<?>> getCrewList(CrewSearchReqDto searchReqDto) {
        CrewSearchRespDto result = crewService.searchCrew(searchReqDto);
        return ResponseEntity.ok(ResponseDto.success(result));
    }

    @PostMapping
    public ResponseEntity<ResponseDto<?>> registerCrew(@ModelAttribute CrewRegisterReqDto dto) {
        crewService.register(dto);
        return ResponseEntity.ok(ResponseDto.success("Crew 등록 성공"));
    }

    @GetMapping("/{crewId}")
    public ResponseEntity<ResponseDto<?>> getCrew(@PathVariable Integer crewId) {
        return ResponseEntity.ok(ResponseDto.success(crewService.getCrew(crewId)));
    }
}

