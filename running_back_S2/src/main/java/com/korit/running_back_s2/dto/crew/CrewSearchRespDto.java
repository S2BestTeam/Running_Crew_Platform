package com.korit.running_back_s2.dto.crew;

import com.korit.running_back_s2.domain.crew.Crew;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CrewSearchRespDto {

    private List<Crew> contents;
    private Integer totalElements;
    private Integer totalPages;
    private Integer page;
    private Integer size;
    private Boolean isLast;
}