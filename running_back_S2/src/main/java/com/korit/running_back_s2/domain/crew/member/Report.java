package com.korit.running_back_s2.domain.crew.member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Report {
    private Integer reportId;
    private Integer crewId;
    private Integer reporterId;
    private Integer reportedId;
    private String reason;
}
