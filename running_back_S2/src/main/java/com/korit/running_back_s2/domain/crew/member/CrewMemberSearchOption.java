package com.korit.running_back_s2.domain.crew.member;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CrewMemberSearchOption {
    private Integer crewId;
    private Integer startIndex;
    private Integer size;
    private String searchText;
}

