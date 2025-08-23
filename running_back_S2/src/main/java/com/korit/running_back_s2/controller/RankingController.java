package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.dto.ranking.CrewRankingRespDto;
import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.service.RankingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ranking")
@RequiredArgsConstructor
public class RankingController {

    private final RankingService rankingService;

    @GetMapping("/crew/totalKm")
    public ResponseEntity<ResponseDto<?>> CrewRankingTotalKM () {
        return ResponseEntity.ok(ResponseDto.success(rankingService.CrewRankingTotalKM()));
    }

    @GetMapping("/user")
    public ResponseEntity<ResponseDto<?>> getUserRanking () {
        return ResponseEntity.ok(ResponseDto.success(null));
    }
}
