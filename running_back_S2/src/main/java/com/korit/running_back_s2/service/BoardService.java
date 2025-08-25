package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.board.BoardMapper;
import com.korit.running_back_s2.domain.board.FreeBoard;
import com.korit.running_back_s2.dto.board.FreeBoardReqDto;
import com.korit.running_back_s2.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final PrincipalUtil principalUtil;
    private final BoardMapper boardMapper;

    public void register(Integer crewId, FreeBoardReqDto dto) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();

        FreeBoard freeBoard = FreeBoard.builder()
                .crewId(crewId)
                .userId(userId)
                .title(dto.getTitle())
                .content(dto.getContent())
                .build();
        boardMapper.insert(freeBoard);
    }



}
