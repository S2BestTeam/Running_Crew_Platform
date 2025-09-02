package com.korit.running_back_s2.dto.ask;

import lombok.Data;

@Data
public class UpdateAskCommentReqDto {
    private Integer askCommentId;
    private String content;
}
