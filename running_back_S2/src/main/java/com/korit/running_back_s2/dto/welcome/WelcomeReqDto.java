package com.korit.running_back_s2.dto.welcome;

import com.korit.running_back_s2.domain.welcome.Welcome;
import lombok.Data;

@Data
public class WelcomeReqDto {
    private Integer userId;
    private Integer crewId;
    private String content;
    private String status;

    public Welcome welcome(Integer crewId) {
        return Welcome.builder()
                .crewId(crewId)
                .userId(userId)
                .content(content)
                .status("거절")
                .build();
    }
}
