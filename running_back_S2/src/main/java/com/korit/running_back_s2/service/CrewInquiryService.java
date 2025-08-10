package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.inquiries.crew.CrewInquiry;
import com.korit.running_back_s2.domain.inquiries.crew.CrewInquiryMapper;
import com.korit.running_back_s2.dto.inquiries.crew.InquiryCrewModifyReqDto;
import com.korit.running_back_s2.dto.inquiries.crew.InquiryCrewRegisterReqDto;
import com.korit.running_back_s2.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CrewInquiryService {

    private final CrewInquiryMapper crewInquiryMapper;
    private final PrincipalUtil principalUtil;

    public List<CrewInquiry> getCrewInquiry() {
        return crewInquiryMapper.findAll();
    }

    public CrewInquiry registerCrewInquiry(InquiryCrewRegisterReqDto dto) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        CrewInquiry crewInquiry = dto.insertCrewInquiry(userId);
        crewInquiryMapper.insert(crewInquiry);
        return crewInquiry;
    }

    public void modifyCrewInquiry(InquiryCrewModifyReqDto dto) {
        CrewInquiry crewInquiry = dto.toUpdate();
        crewInquiryMapper.update(crewInquiry);
    }
}
