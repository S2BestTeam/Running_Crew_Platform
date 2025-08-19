package com.korit.running_back_s2.dto.crew;

import lombok.Builder;
import lombok.Data;
import org.springframework.context.annotation.Primary;

@Data
@Builder
public class CrewReportRespDto {
    private int reportId;
    private int crewId;

    private Integer reporterUserId;
    private String  reporterUserName;

    private Integer reportedUserId;
    private String  reportedUserName;

    private String  reason;
}
