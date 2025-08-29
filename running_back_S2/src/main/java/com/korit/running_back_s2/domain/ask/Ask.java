package com.korit.running_back_s2.domain.ask;

import com.korit.running_back_s2.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Ask {
    private Integer askId;
    private Integer userId;
    private String title;
    private String content;
    private LocalDate createdAt;
    private Integer isAnswer;

    private User user;
}
