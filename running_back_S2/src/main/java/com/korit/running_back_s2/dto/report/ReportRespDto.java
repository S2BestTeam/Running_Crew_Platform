package com.korit.running_back_s2.dto.report;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class ReportRespDto {
    private int reportId;
    private Integer crewId;
    private Integer reportMemberId;
    private Integer reportedUserId;
    private String  reason;
    private LocalDate createdAt;
}
