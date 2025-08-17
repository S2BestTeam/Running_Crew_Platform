package com.korit.running_back_s2.dto.crew;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class CrewWelcomeResDto {
    private Integer crewWelcomeId;
    private Integer crewId;
    private Integer userId;
    private String content;
    private LocalDateTime createdAt;
    private LocalDate birthDate;
    private String nickname;
    private String fullName;
    private Integer welcomeRank;
}
