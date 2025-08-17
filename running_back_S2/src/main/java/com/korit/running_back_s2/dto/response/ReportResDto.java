package com.korit.running_back_s2.dto.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReportResDto {
    private String reason;
    private LocalDateTime createdAt;
}
