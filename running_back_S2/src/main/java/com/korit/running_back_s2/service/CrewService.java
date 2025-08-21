package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.crew.Crew;
import com.korit.running_back_s2.domain.crew.CrewMapper;
import com.korit.running_back_s2.domain.crew.CrewSearchOption;
import com.korit.running_back_s2.domain.member.MemberMapper;
import com.korit.running_back_s2.dto.crew.*;
import com.korit.running_back_s2.dto.response.PaginationRespDto;
import com.korit.running_back_s2.security.model.PrincipalUtil;
import com.korit.running_back_s2.util.ImageUrlUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CrewService {

    private final PrincipalUtil principalUtil;
    private final CrewMapper crewMapper;
    private final FileService fileService;
    private final MemberMapper memberMapper;
    private final ImageUrlUtil imageUrlUtil;

    @Transactional(rollbackFor = Exception.class)
    public void register(CrewRegisterReqDto dto) throws Exception {

        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        int registeredCrew = crewMapper.checkCrew(userId);

        if (registeredCrew != 0) {
            // 409 CONFLICT와 함께 메시지 전달
            throw new ResponseStatusException(HttpStatus.CONFLICT, "이미 등록한 크루가 있습니다.");
        }
        String picture = fileService.uploadFile(dto.getProfilePicture(), "crewProfile");
        String thumbnailImg = fileService.uploadFile(dto.getThumbnailPicture(), "crewThumbnail");

        Crew crew = Crew.builder()
                .userId(userId)
                .gunguId(dto.getGunguId())
                .crewName(dto.getCrewName())
                .title(dto.getTitle())
                .content(dto.getContent())
                .limitedPeople(dto.getLimitedPeople())
                .profilePicture(picture)
                .thumbnailPicture(thumbnailImg)
                .build();
        crewMapper.insert(crew);
        memberMapper.insertLeaderRole(userId, crew.getCrewId());
    }

    public String checkCrewNames(String crewName) {
        Crew checkCrewName = crewMapper.findByCrewName(crewName);
        if (checkCrewName == null) {
            return "false";
        } else {
            return "true";
        }
    }

    public Crew getCrewById(Integer crewId) {
        Crew crew = crewMapper.findByCrewId(crewId);
        if (crew == null) {
            throw new RuntimeException("크루를 찾을 수 없습니다. CREWID: " + crewId);
        }
        return crew;
    }

    public PaginationRespDto<Crew> getCrewList(Integer page, Integer size,
                                               Integer gunguId, String searchText) {

        CrewSearchOption crewSearchOption = CrewSearchOption.builder()
                .startIndex((page -1) * size)
                .size(size)
                .gunguId(gunguId)
                .searchText((searchText != null) ? searchText : null)
                .build();

        List<Crew> contents = crewMapper.findAllBySearchOption(crewSearchOption).stream().map(crew -> {
            crew.setProfilePicture(imageUrlUtil.buildImageUrl(crew.getProfilePicture(), "crewProfile"));
            crew.setThumbnailPicture(imageUrlUtil.buildImageUrl(crew.getThumbnailPicture(), "crewThumbnail"));
            return crew;
        }).collect(Collectors.toList());

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

