package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.crew.CrewMapper;
import com.korit.running_back_s2.domain.user.UserMapper;
import com.korit.running_back_s2.dto.ranking.CrewRankingRespDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RankingService {

    private final CrewMapper crewMapper;
    private final UserMapper userMapper;


    public List<CrewRankingRespDto> CrewRankingTotalKM () {
        return crewMapper.getCrewRankingTop10ByTotalKm();
    }
//    public List<> UserRanking () {
//        return userMapper
//    }
}
