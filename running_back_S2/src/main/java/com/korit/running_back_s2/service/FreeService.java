package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.crewFree.CrewFree;
import com.korit.running_back_s2.domain.crewFree.CrewFreeMapper;
import com.korit.running_back_s2.domain.crewFree.CrewFreeSearchOption;
import com.korit.running_back_s2.dto.response.PaginationRespDto;
import com.korit.running_back_s2.security.model.PrincipalUser;
import com.korit.running_back_s2.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FreeService {

    private final CrewFreeMapper crewFreeMapper;

    public PaginationRespDto<CrewFree> getCrewFree(Integer page, Integer size, Integer crewId, String searchText) {
        CrewFreeSearchOption opt = CrewFreeSearchOption.builder()
                .crewId(crewId)
                .startIndex((page - 1) * size)
                .size(size)
                .searchText((searchText != null && !searchText.isBlank()) ? searchText : null)
                .build();

        List<CrewFree> contents = crewFreeMapper.findAllFreeListBySearchOption(opt);
        Integer totalElements = crewFreeMapper.countFreeListsBySearchOption(opt);
        Integer totalPages = (int) Math.ceil(totalElements.doubleValue() / size.doubleValue());
        boolean isLast = page >= Math.max(totalPages, 1);

        return PaginationRespDto.<CrewFree>builder()
                .contents(contents)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .page(page)
                .size(size)
                .isLast(isLast)
                .build();
    }

    public CrewFree getFreeFeedDetail(Integer freeId) {
        return crewFreeMapper.findByFreeId(freeId);
    }
}

