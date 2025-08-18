package com.korit.running_back_s2.dto.crew;

import com.korit.running_back_s2.domain.crew.welcome.CrewWelcome;
import lombok.Data;

@Data
public class CrewWelcomeReqDto {
    private Integer userId;
    private String content;

    public CrewWelcome welcome(Integer crewId) {
        return CrewWelcome.builder()
                .crewId(crewId)
                .userId(userId)
                .content(content)
                .build();
    }
}
