package com.korit.running_back_s2.domain.ask;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Answer {
    private Integer answerId;
    private Integer askId;
    private Integer userId;
    private String content;
    private LocalDate createdAt;
}
