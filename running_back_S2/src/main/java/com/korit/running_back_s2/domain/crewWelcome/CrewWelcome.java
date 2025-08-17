package com.korit.running_back_s2.domain.crewWelcome;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CrewWelcome {
    private Integer crewWelcomeId;
    private Integer crewId;
    private Integer userId;
    private String content;
}
