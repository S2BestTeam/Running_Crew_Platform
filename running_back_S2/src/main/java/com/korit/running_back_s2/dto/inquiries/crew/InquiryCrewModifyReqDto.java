package com.korit.running_back_s2.dto.inquiries.crew;

import com.korit.running_back_s2.domain.inquiries.crew.CrewInquiry;
import lombok.Data;

import java.time.LocalDate;

@Data
public class InquiryCrewModifyReqDto {
    private Integer crewInquiryId;
    private String category;
    private String title;
    private String content;
    private LocalDate createdAt;

    public CrewInquiry toUpdate() {
        return CrewInquiry.builder()
                .crewInquiryId(crewInquiryId)
                .category(category)
                .title(title)
                .content(content)
                .createdAt(createdAt)
                .build();
    }
}
