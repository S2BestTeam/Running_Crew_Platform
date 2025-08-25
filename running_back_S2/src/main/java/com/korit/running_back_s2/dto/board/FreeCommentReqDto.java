package com.korit.running_back_s2.dto.board;

import lombok.Data;

@Data
public class FreeCommentReqDto {
    private Integer crewId;
    private Integer freeId;
    private String content;
}
