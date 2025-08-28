package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.crewFreeComment.CrewFreeComment;
import com.korit.running_back_s2.domain.crewFreeComment.CrewFreeCommentMapper;
import com.korit.running_back_s2.dto.crewFree.FreeCommentReqDto;
import com.korit.running_back_s2.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public void updateComment(Integer freeCommentId, String content) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        int updated = crewFreeCommentMapper.updateComment(freeCommentId, userId, content);
    }

    @Transactional
    public void deleteComment(Integer freeId, Integer freeCommentId) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        int deleted = crewFreeCommentMapper.deleteComment(freeId, freeCommentId, userId);
    }
}
