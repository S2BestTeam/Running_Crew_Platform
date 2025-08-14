package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.crew.Crew;
import com.korit.running_back_s2.domain.crew.CrewMapper;
import com.korit.running_back_s2.domain.crew.CrewSearchOption;
import com.korit.running_back_s2.dto.response.PaginationRespDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CrewService {
    private final CrewMapper crewMapper;

    public PaginationRespDto<Crew> getCrewList(Integer page, Integer size,
                                               Integer gunguId, String searchText) {

        CrewSearchOption crewSearchOption = CrewSearchOption.builder()
                .startIndex((page -1) * size)
                .size(size)
                .gunguId(gunguId)
                .searchText((searchText != null) ? searchText : null)
                .build();

        List<Crew> contents = crewMapper.findAllBySearchOption(crewSearchOption);
        Integer totalElements = crewMapper.countBySearchOption(crewSearchOption);
        Integer totalPages = (int) Math.ceil(totalElements.doubleValue() / size.doubleValue());
        Boolean isLast = page.equals(totalPages);

        return PaginationRespDto.<Crew>builder()
                .contents(contents)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .page(page)
                .size(size)
                .isLast(isLast)
                .build();
    }
}
