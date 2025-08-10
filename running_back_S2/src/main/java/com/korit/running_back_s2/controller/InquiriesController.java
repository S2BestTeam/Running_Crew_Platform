package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.dto.inquiries.crew.InquiryCrewModifyReqDto;
import com.korit.running_back_s2.dto.inquiries.crew.InquiryCrewRegisterReqDto;
import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.service.CrewInquiryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/inquiry")
@RequiredArgsConstructor
public class InquiriesController {

    private final CrewInquiryService crewInquiryService;

    @GetMapping("/crews")
    public ResponseEntity<ResponseDto<?>> getInquiriesCrews() {
        return ResponseEntity.ok(ResponseDto.success(crewInquiryService.getCrewInquiry()));
    }

    @PostMapping("/crews/register")
    public ResponseEntity<ResponseDto<?>> reqRegisterInquiryCrew(@RequestBody InquiryCrewRegisterReqDto dto) {
        return ResponseEntity.ok(ResponseDto.success(crewInquiryService.registerCrewInquiry(dto)));
    }

//    @PutMapping("/crews/${crewInquiryId}")
//    public ResponseEntity<ResponseDto<?>> reqModifyInquiryCrew(@RequestBody InquiryCrewModifyReqDto dto) {
//        crewInquiryService.modifyCrewInquiry(dto);
//        return ResponseEntity.ok(ResponseDto.success("수정 성공"));
//    }
}
