package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.crew.CrewMapper;
import com.korit.running_back_s2.domain.user.UserMapper;
import com.korit.running_back_s2.dto.ranking.CrewRankingGroupRespDto;
import com.korit.running_back_s2.dto.ranking.CrewRankingRespDto;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RankingService {

    private final CrewMapper crewMapper;
    private final UserMapper userMapper;

    private CrewRankingGroupRespDto cachedCrewRankings;
    private LocalDateTime lastUpdated;
    private static final Duration CACHE_DURATION = Duration.ofDays(7);


    @PostConstruct
    @Scheduled(cron = "0 0 0 * * MON")
    public void updateCrewRankings () {
        CrewRankingGroupRespDto newCrewRankings = calculateRankingsFromDB();

        cachedCrewRankings = newCrewRankings;
        lastUpdated = LocalDateTime.now();
    }

    public CrewRankingGroupRespDto getAllCrewRankings () {
        if (isCacheExpired()) {
            updateCrewRankings();
        } else {
            lastUpdated.format(DateTimeFormatter.ofPattern("MM-dd HH:mm:ss"));
        }

        return cachedCrewRankings;
    }

    private boolean isCacheExpired() {
        return cachedCrewRankings == null || lastUpdated == null || Duration.between(lastUpdated, LocalDateTime.now()).compareTo(CACHE_DURATION) > 0;
    }

    private CrewRankingGroupRespDto calculateRankingsFromDB() {
        List<CrewRankingRespDto> totalKmRanking = crewMapper.selectTop10CrewRankingByTotalKm();
        List<CrewRankingRespDto> memberRanking = crewMapper.selectTop10CrewRankingByMemberCount();
        List<CrewRankingRespDto> newRanking = crewMapper.selectTop10CrewRankingByCreatedDate();

        return new CrewRankingGroupRespDto(totalKmRanking, memberRanking, newRanking);
    }
//    public List<> UserRanking () {
//        return userMapper
//    }

}
