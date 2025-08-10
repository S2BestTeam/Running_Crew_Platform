package com.korit.running_back_s2.dto.response.crew;

import com.korit.running_back_s2.domain.crew.CrewSearchOption;
import lombok.Data;

@Data
public class CrewSearchReqDto {
    private Integer page;
    private Integer size;
    private String searchText;
    private Integer gunguId;

    public CrewSearchOption toOption() {
        return CrewSearchOption.builder()
                .startIndex((page - 1) * size)
                .size(size)
                .searchText(searchText)
                .gunguId(gunguId)
                .build();
    }
}