package com.korit.running_back_s2.service;

<<<<<<< HEAD
import com.korit.running_back_s2.domain.ask.*;
import com.korit.running_back_s2.domain.globalFreeBoard.GlobalFree;
import com.korit.running_back_s2.domain.globalFreeBoard.GlobalFreeMapper;
import com.korit.running_back_s2.domain.globalFreeBoard.GlobalFreeSearchOption;
import com.korit.running_back_s2.dto.ask.AskCommentReqDto;
=======
import com.korit.running_back_s2.domain.ask.Answer;
import com.korit.running_back_s2.domain.ask.Ask;
import com.korit.running_back_s2.domain.ask.AskFreeSearchOption;
import com.korit.running_back_s2.domain.ask.AskMapper;
import com.korit.running_back_s2.domain.globalFreeBoard.GlobalFree;
import com.korit.running_back_s2.domain.globalFreeBoard.GlobalFreeMapper;
import com.korit.running_back_s2.domain.globalFreeBoard.GlobalFreeSearchOption;
import com.korit.running_back_s2.dto.ask.AnswerReqDto;
>>>>>>> origin/95-세부기능-다듬기-4
import com.korit.running_back_s2.dto.ask.AskReqDto;
import com.korit.running_back_s2.dto.globalFree.GlobalFreeBoardReqDto;
import com.korit.running_back_s2.dto.response.PaginationRespDto;
import com.korit.running_back_s2.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AskService {

    private final AskMapper askMapper;
    private final PrincipalUtil principalUtil;
    private final AskCommentMapper askCommentMapper;

    public PaginationRespDto<Ask> getList(Integer page, Integer size, String searchText) {
        AskFreeSearchOption opt = AskFreeSearchOption.builder()
                .startIndex((page - 1) * size)
                .size(size)
                .searchText((searchText != null && !searchText.isBlank()) ? searchText : null)
                .build();

        List<Ask> contents = askMapper.findAllAskBySearchOption(opt);
        Integer totalElements = askMapper.countListsBySearchOption(opt);
        Integer totalPages = (int) Math.ceil(totalElements.doubleValue() / size.doubleValue());
        boolean isLast = page >= Math.max(totalPages, 1);

        return PaginationRespDto.<Ask>builder()
                .contents(contents)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .page(page)
                .size(size)
                .isLast(isLast)
                .build();
    }

    public void register(AskReqDto dto) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();

        Ask ask = Ask.builder()
                .userId(userId)
                .title(dto.getTitle())
                .content(dto.getContent())
                .build();

        askMapper.insert(ask);
    }

    public List<Ask> getDetail(Integer askId) {
        return askMapper.findDetailById(askId);
    }

<<<<<<< HEAD
    public void registerComment(AskCommentReqDto dto){
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        askMapper.updateIsAnswer(dto.getAskId());
        askCommentMapper.insert(dto.toEntity(userId));
    }

    public List<AskComment> getComments(Integer askId) {
        return askCommentMapper.findAllByAskId(askId);
    }

    public void deleteAskComment(Integer askCommentId) {
        askCommentMapper.updateCommentStatus(askCommentId);
=======
    public void registerAnswer(Integer askId, AnswerReqDto dto) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();

        Answer answer = Answer.builder()
                .askId(askId)
                .userId(userId)
                .content(dto.getContent())
                .build();

        askMapper.insertAnswer(answer);
        askMapper.updateIsAnswer(askId);
>>>>>>> origin/95-세부기능-다듬기-4
    }
}
