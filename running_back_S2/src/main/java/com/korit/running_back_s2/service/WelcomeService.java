package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.welcome.WelcomeMapper;
import com.korit.running_back_s2.domain.welcome.Welcome;
import com.korit.running_back_s2.dto.welcome.WelcomeReqDto;
import com.korit.running_back_s2.dto.welcome.WelcomeResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WelcomeService {

    private final WelcomeMapper welComeMapper;

    public List<WelcomeResDto> getWelcomes(Integer crewId) {
        return welComeMapper.findAllByCrewId(crewId);
    }

    public void registerWelcome(Integer crewId, WelcomeReqDto dto) {
        WelcomeResDto foundWelcome = welComeMapper.findByCrewIdAndUserId(crewId, dto.getUserId());
        if(foundWelcome != null) {
            throw new RuntimeException("이미 해당 크루에 신청한 유저입니다.");
        }
        Welcome welcome = dto.welcome(crewId);
        welComeMapper.insert(welcome);
    }

    public void reject(WelcomeReqDto dto){
        Welcome welcome = dto.welcome(dto.getCrewId());
        welComeMapper.reject(welcome);
    }
}
