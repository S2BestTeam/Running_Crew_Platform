package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.dto.board.FreeBoardReqDto;
import com.korit.running_back_s2.dto.board.FreeCommentReqDto;
import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.service.CrewFreeCommentService;
import com.korit.running_back_s2.service.CrewFreeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/freeBoards")
@RequiredArgsConstructor
public class CrewFreeController {

    private final CrewFreeService crewFreeService;
    private final CrewFreeCommentService crewFreeCommentService;

    @GetMapping("/{crewId}")
    public ResponseEntity<ResponseDto<?>> getCrewFree(@RequestParam Integer page, @RequestParam Integer size, @PathVariable Integer crewId, @RequestParam(required = false) String searchText) {
        return ResponseEntity.ok(ResponseDto.success(crewFreeService.getCrewFree(page, size, crewId, searchText)));
    }

    @PostMapping("/{crewId}")
    public ResponseEntity<ResponseDto<?>> registerFreeBoard(@PathVariable Integer crewId, @RequestBody FreeBoardReqDto dto) throws Exception {
        crewFreeService.register(crewId, dto);
        return ResponseEntity.ok(ResponseDto.success("크루 자유게시판 등록 성공"));
    }

    @GetMapping("/{crewId}/detail/{freeId}")
    public ResponseEntity<ResponseDto<?>> getFreeBoardDetail(@PathVariable Integer crewId, @PathVariable Integer freeId) {
        return ResponseEntity.ok(ResponseDto.success(crewFreeService.getFreeBoardDetail(crewId, freeId)));
    }

    @PostMapping("/{crewId}/detail/{freeId}")
    public ResponseEntity<ResponseDto<?>> registerFreeComment(@RequestBody FreeCommentReqDto dto) {
        crewFreeCommentService.registerComment(dto);
        return ResponseEntity.ok(ResponseDto.success("댓글 등록 성공"));
    }

    @GetMapping("/{crewId}/detail/{freeId}/comments")
    public ResponseEntity<ResponseDto<?>> getFreeCommentList(@PathVariable Integer freeId) {
        return ResponseEntity.ok(ResponseDto.success(crewFreeCommentService.getFreeCommentList(freeId)));
    }
}
