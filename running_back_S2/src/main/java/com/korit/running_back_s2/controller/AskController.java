package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.dto.ask.AskCommentReqDto;
import com.korit.running_back_s2.dto.ask.AskReqDto;
import com.korit.running_back_s2.dto.ask.UpdateAskCommentReqDto;
import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.security.model.PrincipalUtil;
import com.korit.running_back_s2.service.AskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ask")
@RequiredArgsConstructor
public class AskController {
    
    private final AskService askService;

    @GetMapping
    public ResponseEntity<ResponseDto<?>> get(@RequestParam Integer page, @RequestParam Integer size, @RequestParam(required = false) String searchText) {
        return ResponseEntity.ok(ResponseDto.success(askService.getList(page, size, searchText)));
    }

    @PostMapping
    public ResponseEntity<ResponseDto<?>> register(@RequestBody AskReqDto dto) throws Exception {
        askService.register(dto);
        return ResponseEntity.ok(ResponseDto.success("문의 등록 성공"));
    }

    @GetMapping("/{askId}")
    public ResponseEntity<ResponseDto<?>> getDetail(@PathVariable Integer askId) {
        return ResponseEntity.ok(ResponseDto.success(askService.getDetail(askId)));
    }

    @PostMapping("/{askId}/comments")
    public ResponseEntity<ResponseDto<?>> registerAskComment(@RequestBody AskCommentReqDto dto) {
        askService.registerComment(dto);
        return ResponseEntity.ok(ResponseDto.success("댓글 등록 성공"));
    }

    @GetMapping("/{askId}/comments")
    public ResponseEntity<ResponseDto<?>> getAskComments(@PathVariable Integer askId) {
        return ResponseEntity.ok(ResponseDto.success(askService.getComments(askId)));
    }

    @PutMapping("/comments/{askCommentId}")
    public ResponseEntity<ResponseDto<?>> updateAskComment (@RequestBody UpdateAskCommentReqDto dto) {
        return ResponseEntity.ok(ResponseDto.success(null));
    }

    @PatchMapping("/comments/{askCommentId}")
    public ResponseEntity<ResponseDto<?>> deleteAskComment (@PathVariable Integer askCommentId) {
        askService.deleteAskComment(askCommentId);
        return ResponseEntity.ok(ResponseDto.success("댓글 수정 완료"));
    }
}
