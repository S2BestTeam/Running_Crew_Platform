package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.crewWelcome.CrewWelComeMapper;
import com.korit.running_back_s2.domain.crewWelcome.CrewWelcome;
import com.korit.running_back_s2.dto.crew.CrewWelcomeReqDto;
import com.korit.running_back_s2.dto.crew.CrewWelcomeResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CrewWelcomeService {

    private final CrewWelComeMapper crewWelComeMapper;

    public List<CrewWelcomeResDto> getCrewWelcomes(Integer crewId) {
        return crewWelComeMapper.findAllByCrewId(crewId);
    }

    public void registerCrewWelcome(Integer crewId, CrewWelcomeReqDto dto) {
        CrewWelcome welcome = dto.welcome(crewId);
        crewWelComeMapper.insert(welcome);
    }
}
