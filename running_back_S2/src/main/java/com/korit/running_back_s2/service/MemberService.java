package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.member.Member;
import com.korit.running_back_s2.domain.member.MemberMapper;
import com.korit.running_back_s2.domain.member.MemberSearchOption;
import com.korit.running_back_s2.domain.welcome.WelcomeMapper;
import com.korit.running_back_s2.dto.member.ExistsCheckReqDto;
import com.korit.running_back_s2.dto.member.MemberRoleUpdateReqDto;
import com.korit.running_back_s2.dto.response.PaginationRespDto;
import com.korit.running_back_s2.dto.welcome.WelcomeReqDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberMapper memberMapper;
    private final WelcomeMapper welcomeMapper;

    public boolean isExists (ExistsCheckReqDto dto) {
        boolean welcomeExists = welcomeMapper.existsFind(dto);
        boolean memberExists = memberMapper.existsFind(dto);
        return !(welcomeExists || memberExists);
    }

    public PaginationRespDto<Member> getMembers(Integer page, Integer size, Integer crewId, String searchText) {
        MemberSearchOption opt = MemberSearchOption.builder()
                .crewId(crewId)
                .startIndex((page - 1) * size)
                .size(size)
                .searchText((searchText != null && !searchText.isBlank()) ? searchText : null)
                .build();

        List<Member> contents = memberMapper.findAllMembersBySearchOption(opt);
        Integer totalElements = memberMapper.countMembersBySearchOption(opt);
        Integer totalPages = (int) Math.ceil(totalElements.doubleValue() / size.doubleValue());
        boolean isLast = page >= Math.max(totalPages, 1);

        return PaginationRespDto.<Member>builder()
                .contents(contents)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .page(page)
                .size(size)
                .isLast(isLast)
                .build();
    }

    public Member getMemberDetail(Integer memberId) {
        return memberMapper.findById(memberId);
    }

    public void updateRole(MemberRoleUpdateReqDto dto) {
        int updated = memberMapper.updateRole(dto.getMemberId(), dto.getRoleId());
        if (updated == 0) {
            throw new IllegalStateException("권한 변경 중 오류");
        }
    }

    public void expel(Integer memberId) {
        int deleted = memberMapper.deleteMember(memberId);
        if (deleted == 0) {
            throw new IllegalStateException("리더는 추방할 수 없거나 대상이 존재하지 않습니다.");
        }
    }

    public void registerMember(Member member) {
        welcomeMapper.update(member);
        memberMapper.insert(member);
    }

    public Integer countMember(Integer crewId) {
        return memberMapper.countMember(crewId);
    }
}
