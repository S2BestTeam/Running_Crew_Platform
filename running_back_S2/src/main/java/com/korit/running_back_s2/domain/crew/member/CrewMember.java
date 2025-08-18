package com.korit.running_back_s2.domain.crew.member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CrewMember {
    private Integer crewMemberId;
    private Integer crewId;
    private Integer userId;
    private Integer roleId;
    private String fullName;
    private String nickname;
    private String profileImg;
}