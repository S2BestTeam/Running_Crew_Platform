package com.korit.running_back_s2.service;

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

    public void report(ReportReqDto dto) {
        Integer reporterId = principalUtil.getPrincipalUser().getUser().getUserId();
        Report report = Report.builder()
                .crewId(3)
                .reporterId(reporterId)
                .reportedId(dto.getUserId())
                .reason(dto.getReason())
                .build();
        reportMapper.report(report);
    }

    public List<ReportRespDto> getReportList(Integer crewId) {
        return reportMapper.getReportList(crewId);
    }
}
