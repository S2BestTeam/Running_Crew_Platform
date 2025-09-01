package com.korit.running_back_s2.dto.ask;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnswerReqDto {
    private Integer askId;
    private String content;
}
