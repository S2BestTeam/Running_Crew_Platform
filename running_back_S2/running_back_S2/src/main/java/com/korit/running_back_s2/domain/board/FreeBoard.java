package com.korit.running_back_s2.domain.board;

import com.korit.running_back_s2.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FreeBoard {
    private int freeId;
    private int crewId;
    private int userId;
    private String title;
    private String content;
    private LocalDate createdAt;

    private User user;
}
