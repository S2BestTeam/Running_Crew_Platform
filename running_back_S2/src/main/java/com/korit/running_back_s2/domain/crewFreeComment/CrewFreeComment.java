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
    private String content;
    private Integer userId;
    private LocalDate createdAt;

    private User user;
}

