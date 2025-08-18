package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.crew.Crew;
import com.korit.running_back_s2.domain.crew.CrewMapper;
import com.korit.running_back_s2.domain.crew.CrewSearchOption;
<<<<<<< HEAD
import com.korit.running_back_s2.domain.crew.member.*;
import com.korit.running_back_s2.domain.crew.welcome.CrewWelComeMapper;
import com.korit.running_back_s2.domain.crew.welcome.CrewWelcome;
import com.korit.running_back_s2.dto.crew.CrewMemberDetailRespDto;
=======
import com.korit.running_back_s2.domain.user.UserMapper;
>>>>>>> origin/22-크루-정모-일정-등록-기능-구현
import com.korit.running_back_s2.dto.crew.CrewRegisterReqDto;
import com.korit.running_back_s2.dto.crew.CrewWelcomeReqDto;
import com.korit.running_back_s2.dto.response.CrewWelcomeResDto;
import com.korit.running_back_s2.dto.response.PaginationRespDto;
<<<<<<< HEAD
import com.korit.running_back_s2.security.model.PrincipalUser;
=======
import com.korit.running_back_s2.security.model.PrincipalUtil;
>>>>>>> origin/22-크루-정모-일정-등록-기능-구현
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public void register(CrewRegisterReqDto dto) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        String profileImg = fileService.uploadFile(dto.getCrewProfileImg(), "/crew");
        String thumbnailImg = fileService.uploadFile(dto.getCrewProfileImg(), "/crew");

        Crew crew = Crew.builder()
                .userId(userId)
                .gunguId(dto.getGunguId())
                .crewName(dto.getCrewName())
                .title(dto.getTitle())
                .content(dto.getContent())
                .limitedPeople(dto.getLimitedPeople())
                .crewProfileImg(profileImg)
                .crewThumbnailImg(thumbnailImg)
                .build();
        crewMapper.insert(crew);
        userMapper.updateRoleId(userId, 2);
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

    public CrewMemberDetailRespDto getMemberDetail(Integer crewId, Integer userId) {
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

}

