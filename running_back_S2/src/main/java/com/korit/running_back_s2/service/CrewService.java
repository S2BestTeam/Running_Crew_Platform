package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.crew.Crew;
import com.korit.running_back_s2.domain.crew.CrewMapper;
import com.korit.running_back_s2.domain.crew.CrewSearchOption;
import com.korit.running_back_s2.domain.crew.member.*;
import com.korit.running_back_s2.domain.crew.welcome.CrewWelComeMapper;
import com.korit.running_back_s2.domain.crew.welcome.CrewWelcome;
import com.korit.running_back_s2.dto.crew.*;
import com.korit.running_back_s2.domain.user.UserMapper;
import com.korit.running_back_s2.dto.response.CrewWelcomeResDto;
import com.korit.running_back_s2.dto.response.PaginationRespDto;
import com.korit.running_back_s2.security.model.PrincipalUser;
import com.korit.running_back_s2.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CrewService {

    private final PrincipalUtil principalUtil;
    private final CrewMapper crewMapper;
    private final UserMapper userMapper;
    private final FileService fileService;
    private final CrewMemberMapper crewMemberMapper;
    private final CrewWelComeMapper crewWelComeMapper;

    @Transactional(rollbackFor = Exception.class)
    public void register(CrewRegisterReqDto dto) throws Exception {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        String picture = fileService.uploadFile(dto.getProfilePicture(), "/crew/profile");
        String thumbnailImg = fileService.uploadFile(dto.getThumbnailPicture(), "/crew/thumbnail");

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
        crewMemberMapper.insertLeaderRole(userId, crew.getCrewId());
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

    public CrewMember getMemberDetail(Integer memberId) {
        return crewMemberMapper.findById(memberId);
    }

    public void updateRole(CrewMemberRoleUpdateReqDto dto) {
        int updated = crewMemberMapper.updateRole(dto.getMemberId(), dto.getRoleId());
        if (updated == 0) {
            throw new IllegalStateException("권한 변경 중 오류");
        }
    }

    public void expel(Integer memberId) {
        int deleted = crewMemberMapper.deleteMember(memberId);
        if (deleted == 0) {
            throw new IllegalStateException("리더는 추방할 수 없거나 대상이 존재하지 않습니다.");
        }
    }



    public void registerCrewMember(CrewMember member) {
        crewMemberMapper.insert(member);
    }

    public List<CrewWelcomeResDto> getCrewWelcomes(Integer crewId) {
        return crewWelComeMapper.findAllByCrewId(crewId);
    }

    public void registerCrewWelcome(Integer crewId, CrewWelcomeReqDto dto) {
        CrewWelcome welcome = dto.welcome(crewId);
        crewWelComeMapper.insert(welcome);
    }
    public void report(CrewReportReqDto dto) {
        Integer reporterId = principalUtil.getPrincipalUser().getUser().getUserId();
        Report report = Report.builder()
                .reporterId(reporterId)
                .reportedId(dto.getMemberId())
                .reason(dto.getReason())
                .build();
        crewMemberMapper.report(report);
    }

    public List<CrewReportRespDto> getReportList(Integer crewId) {
        return crewMapper.getReportList(crewId);
    }
}

