package com.korit.running_back_s2.domain.globalNotice;

import com.korit.running_back_s2.domain.member.Member;
import com.korit.running_back_s2.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GlobalNotice {
    private Integer noticeId;
    private Integer userId;
    private String title;
    private String content;
    private LocalDate createdAt;

    private User user;
}
