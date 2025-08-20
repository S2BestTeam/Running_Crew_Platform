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
    private Integer reportMemberId;
    private Integer reportedMemberId;
    private String reason;
}
