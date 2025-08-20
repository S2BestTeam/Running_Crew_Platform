package com.korit.running_back_s2.dto.report;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReportRespDto {
    private int reportId;
    private int crewId;

    private Integer reporterUserId;
    private String  reporterUserName;

    private Integer reportedUserId;
    private String  reportedUserName;

    private String  reason;
}
