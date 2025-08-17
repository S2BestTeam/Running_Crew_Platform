package com.korit.running_back_s2.domain.crewMember;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CrewMember {
    private Integer crewMemberId;
    private Integer crewId;
    private Integer userId;
    private Integer roleId;
}
