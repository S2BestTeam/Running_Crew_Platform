package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.dto.board.FreeBoardReqDto;
import com.korit.running_back_s2.dto.crew.CrewRegisterReqDto;
import com.korit.running_back_s2.dto.response.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/freeBoards")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @PostMapping("/{crewId}")
    public ResponseEntity<ResponseDto<?>> registerFreeBoard(@PathVariable Integer crewId, @RequestBody FreeBoardReqDto dto) throws Exception {
        boardService.register(crewId, dto);
        return ResponseEntity.ok(ResponseDto.success("크루 자유게시판 등록 성공"));
    }

    @GetMapping("/{crewId}/detail/{freeId}")
    public ResponseEntity<ResponseDto<?>> getFreeBoardDetail(@PathVariable Integer crewId, @PathVariable Integer freeId) {
        return ResponseEntity.ok(ResponseDto.success(boardService.getFreeBoardDetail(crewId, freeId)));
    }
}
