package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.member.MemberMapper;
import com.korit.running_back_s2.domain.report.Report;
import com.korit.running_back_s2.domain.report.ReportMapper;
import com.korit.running_back_s2.dto.report.ReportReqDto;
import com.korit.running_back_s2.dto.report.ReportRespDto;
import com.korit.running_back_s2.security.model.PrincipalUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final PrincipalUtil principalUtil;
    private final ReportMapper reportMapper;
    private final MemberMapper memberMapper;

    public void report(Integer crewId, ReportReqDto dto) {
        Integer userId = principalUtil.getPrincipalUser().getUser().getUserId();
        Integer reporterMemberId = memberMapper.findMemberIdByUserId(crewId, userId);
        Report report = Report.builder()
                .reportedMemberId(dto.getMemberId())
                .reportMemberId(reporterMemberId)
                .reason(dto.getReason())
                .build();
        reportMapper.insert(report);
    }
    public List<ReportRespDto> getReportList(Integer crewId) {
        return reportMapper.getReportList(crewId);
    }
}
