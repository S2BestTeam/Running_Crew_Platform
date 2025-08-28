package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.globalFreeComment.GlobalFreeComment;
import com.korit.running_back_s2.domain.globalFreeComment.GlobalFreeCommentMapper;
import com.korit.running_back_s2.dto.globalFree.GlobalFreeCommentReqDto;
import com.korit.running_back_s2.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor

public class GlobalFreeCommentService {
    private final PrincipalUtil principalUtil;
    private final GlobalFreeCommentMapper globalFreeCommentMapper;

    public void registerComment(GlobalFreeCommentReqDto dto) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        GlobalFreeComment freeComment = GlobalFreeComment.builder()
                .freeId(dto.getFreeId())
                .userId(userId)
                .content(dto.getContent())
                .build();
        globalFreeCommentMapper.insert(freeComment);
    }

    public List<GlobalFreeComment> getFreeCommentList(Integer freeId) {
        return globalFreeCommentMapper.getCommentList(freeId);
    }

    public void updateComment(Integer freeCommentId, String content) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        int updated = globalFreeCommentMapper.updateComment(freeCommentId, userId, content);
    }

    @Transactional
    public void deleteComment(Integer freeId, Integer freeCommentId) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        int deleted = globalFreeCommentMapper.deleteComment(freeId, freeCommentId, userId);
    }
}

