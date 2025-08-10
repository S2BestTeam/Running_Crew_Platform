package com.korit.running_back_s2.domain.crew;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CrewSearchOption {
    private Integer startIndex;
    private Integer size;
    private String searchText;
    private Integer gunguId;
}