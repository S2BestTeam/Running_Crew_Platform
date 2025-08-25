package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.service.FreeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/freeBoards")
@RequiredArgsConstructor
public class FreeBoardController {

    private final FreeService freeService;

    @GetMapping("/{crewId}")
    public ResponseEntity<ResponseDto<?>> getCrewFree(@RequestParam Integer page, @RequestParam Integer size,
                                                      @PathVariable Integer crewId,
                                                         @RequestParam(required = false) String searchText) {
        return ResponseEntity.ok(ResponseDto.success(freeService.getCrewFree(page, size, crewId, searchText)));
    }

//    @GetMapping("/{freeId}")
//    public ResponseEntity<?> getFreeFeedDetail(@PathVariable Integer freeId) {
//        return ResponseEntity.ok(ResponseDto.success(freeService.getFreeFeedDetail(freeId)));
//    }
}
