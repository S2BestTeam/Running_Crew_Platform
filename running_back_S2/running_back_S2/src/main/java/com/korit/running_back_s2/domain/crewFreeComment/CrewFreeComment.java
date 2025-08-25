package com.korit.running_back_s2.domain.crewFreeComment;

import com.korit.running_back_s2.domain.crewFreeBoard.CrewFree;
import com.korit.running_back_s2.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CrewFreeComment {
    private Integer freeCommentId;
    private Integer freeId;
    private Integer userId;
    private String content;
    private LocalDate createdAt;

    private User user;
    private CrewFree crewFree;
}

