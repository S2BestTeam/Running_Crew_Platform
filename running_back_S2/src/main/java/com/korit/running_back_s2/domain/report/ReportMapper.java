package com.korit.running_back_s2.domain.report;

import com.korit.running_back_s2.dto.report.ReportRespDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReportMapper {
    int report(Report report);
    List<ReportRespDto> getReportList(Integer crewId);
}
