package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.crewFreeBoard.CrewFreeMapper;
import com.korit.running_back_s2.domain.crewFreeComment.CrewFreeComment;
import com.korit.running_back_s2.domain.crewFreeComment.CrewFreeCommentMapper;
import com.korit.running_back_s2.domain.member.Member;
import com.korit.running_back_s2.domain.member.MemberSearchOption;
import com.korit.running_back_s2.dto.board.FreeCommentReqDto;
import com.korit.running_back_s2.dto.response.PaginationRespDto;
import com.korit.running_back_s2.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CrewFreeCommentService {

    private final PrincipalUtil principalUtil;
    private final CrewFreeCommentMapper crewFreeCommentMapper;

    public void registerComment(FreeCommentReqDto dto) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        CrewFreeComment freeComment = CrewFreeComment.builder()
                .freeId(dto.getFreeId())
                .userId(userId)
                .content(dto.getContent())
                .build();
        crewFreeCommentMapper.insert(freeComment);
    }

    public List<CrewFreeComment> getFreeCommentList(Integer freeId) {
        return crewFreeCommentMapper.getCommentList(freeId);
    }
}
