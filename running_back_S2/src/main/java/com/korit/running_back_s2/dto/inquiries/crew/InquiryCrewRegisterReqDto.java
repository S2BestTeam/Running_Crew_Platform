package com.korit.running_back_s2.dto.inquiries.crew;

import com.korit.running_back_s2.domain.inquiries.crew.CrewInquiry;
import lombok.Data;

import java.time.LocalDate;

@Data
public class InquiryCrewRegisterReqDto {
    private Integer crewId;
    private Integer userId;
    private String category;
    private String title;
    private String content;
    private String status;
    private LocalDate createdAt;

    public CrewInquiry insertCrewInquiry(Integer userId) {
            return CrewInquiry.builder()
            .crewId(1)
            .userId(userId)
            .category(category)
            .title(title)
            .content(content)
            .status("대기")
            .createdAt(createdAt)
            .build();
    }
}
