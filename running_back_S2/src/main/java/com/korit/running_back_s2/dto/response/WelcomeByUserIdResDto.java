package com.korit.running_back_s2.dto.response;

import lombok.Data;

@Data
public class WelcomeByUserIdResDto {
    private Integer crewId;
    private String crewName;
    private String crewProfileImg;
    private String status;
}
