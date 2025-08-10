package com.korit.running_back_s2.domain.inquiries.crew;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CrewInquiryMapper {
    int insert(CrewInquiry crewInquiry);
    int update(CrewInquiry crewInquiry);
    List<CrewInquiry> findAll();
}
