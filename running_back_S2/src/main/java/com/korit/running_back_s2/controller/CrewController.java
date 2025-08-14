package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.service.CrewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/crews")
@RequiredArgsConstructor
public class CrewController {

    private final CrewService crewService;

    @GetMapping
    public ResponseEntity<ResponseDto<?>> getCrewList(
            @RequestParam Integer page, @RequestParam Integer size,
            @RequestParam Integer gunguId, @RequestParam String searchText) {
        return ResponseEntity.ok(ResponseDto.success(crewService.getCrewList(page, size, gunguId, searchText)));
    }
}
