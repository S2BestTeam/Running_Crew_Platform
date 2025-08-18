package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.crew.Crew;
import com.korit.running_back_s2.domain.crew.CrewMapper;
import com.korit.running_back_s2.domain.crew.CrewSearchOption;
import com.korit.running_back_s2.domain.crew.member.*;
import com.korit.running_back_s2.dto.crew.CrewRegisterReqDto;
import com.korit.running_back_s2.dto.response.PaginationRespDto;
import com.korit.running_back_s2.security.model.PrincipalUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CrewService {

    private final CrewMapper crewMapper;
    private final FileService fileService;
    private final CrewMemberMapper crewMemberMapper;

    public void register(CrewRegisterReqDto dto) {
        String uploadedFilename = fileService.uploadFile(dto.getCrewProfileImg(), "/crew");

        Crew crew = Crew.builder()
                .userId(dto.getUserId())
                .gunguId(dto.getGunguId())
                .crewName(dto.getCrewName())
                .title(dto.getTitle())
                .content(dto.getContent())
                .limitedPeople(dto.getLimitedPeople())
                .crewProfileImg("/crew/" + uploadedFilename)
                .crewThumbnailImg("/crew/" + uploadedFilename)
                .userId(dto.getUserId())
                .build();

        crewMapper.insert(crew);
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

    public PaginationRespDto<CrewMember> getMembers( Integer page,Integer size, Integer crewId, String searchText) {
        CrewMemberSearchOption opt = CrewMemberSearchOption.builder()
                .crewId(crewId)
                .startIndex((page - 1) * size)
                .size(size)
                .searchText((searchText != null && !searchText.isBlank()) ? searchText : null)
                .build();

        List<CrewMember> contents = crewMemberMapper.findAllMembersBySearchOption(opt);
        Integer totalElements = crewMemberMapper.countMembersBySearchOption(opt);
        Integer totalPages = (int) Math.ceil(totalElements.doubleValue() / size.doubleValue());
        boolean isLast = page >= Math.max(totalPages, 1);

        return PaginationRespDto.<CrewMember>builder()
                .contents(contents)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .page(page)
                .size(size)
                .isLast(isLast)
                .build();
    }

    public CrewMemberDetailResp getMemberDetail(Integer crewId, Integer userId) {
        return crewMemberMapper.findMemberDetail(crewId, userId);
    }

    public void grant(Integer crewId, Integer userId) {
        int updated = crewMemberMapper.updateRole(crewId, userId);
        if (updated == 0) {
            throw new IllegalStateException("변경 대상이 아니거나 이미 운영진/리더입니다.");
        }
    }

    public void expel(Integer crewId, Integer userId) {
        int deleted = crewMemberMapper.deleteMember(crewId, userId);
        if (deleted == 0) {
            throw new IllegalStateException("리더는 추방할 수 없거나 대상이 존재하지 않습니다.");
        }
    }


    public void report(Integer crewId, Integer userId, PrincipalUser principalUser, String reason) {
        Integer reporterId = principalUser.getUser().getUserId();
        Report report = Report.builder()
                .crewId(crewId)
                .reporterId(reporterId)
                .reportedId(userId)
                .reason(reason)
                .build();
        crewMemberMapper.report(report);
    }
}

