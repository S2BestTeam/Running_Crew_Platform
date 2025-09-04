package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    @GetMapping("/crews/{crewId}/message")
    public ResponseEntity<ResponseDto<?>> getCrewMessage (@PathVariable Integer crewId) {
        return ResponseEntity.ok(ResponseDto.success(messageService.getCrewMessage(crewId)));
    }

    
}
