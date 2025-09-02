package com.korit.running_back_s2.dto.ask;

import com.korit.running_back_s2.domain.ask.AskComment;
import lombok.Data;

@Data
public class AskCommentReqDto {
    private Integer askId;
    private Integer userId;
    private String content;

    public AskComment toEntity(Integer userId) {
        return AskComment.builder()
                .askId(askId)
                .userId(userId)
                .content(content)
                .build();
    }
}
