package com.korit.running_back_s2.dto.member;

import lombok.Data;

@Data
public class ExistsCheckReqDto {
    private Integer crewId;
    private Integer userId;
}