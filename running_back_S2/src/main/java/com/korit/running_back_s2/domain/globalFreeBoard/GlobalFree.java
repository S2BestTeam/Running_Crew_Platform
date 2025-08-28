package com.korit.running_back_s2.domain.globalFreeBoard;

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
public class GlobalFree {
    private Integer freeId;
    private Integer userId;
    private String title;
    private String content;
    private LocalDate createdAt;

    private User user;
}
