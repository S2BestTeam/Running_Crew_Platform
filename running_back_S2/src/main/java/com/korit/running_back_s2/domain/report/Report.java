package com.korit.running_back_s2.domain.report;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Report {
    private Integer crewId;
    private Integer reportId;
    private Integer reporterId;
    private Integer reportedId;
    private String reason;
}
