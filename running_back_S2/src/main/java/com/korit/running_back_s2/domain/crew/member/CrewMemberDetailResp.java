package com.korit.running_back_s2.domain.crew.member;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class CrewMemberDetailResp {
    private Integer userId;
    private String nickname;
    private String fullName;
    private String profileImg;
    private Integer gender;
    private LocalDate birthDate;
    private Double userTotalKm;
    private Integer roleId;
}