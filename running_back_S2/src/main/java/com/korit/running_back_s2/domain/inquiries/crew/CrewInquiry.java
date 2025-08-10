package com.korit.running_back_s2.domain.inquiries.crew;

import com.korit.running_back_s2.domain.crew.Crew;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CrewInquiry {
    private Integer crewInquiryId;
    private Integer crewId;
    private Integer userId;
    private String category;
    private String title;
    private String content;
    private String status;
    private LocalDate createdAt;
}
