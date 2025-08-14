package com.korit.running_back_s2.domain.crew;

import com.korit.running_back_s2.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Crew {
    private Integer crewId;
    private Integer gunguId;
    private String crewProfileImg;
    private String crewName;
    private Integer userId;
    private String title;
    private String content;
    private Date createdAt;

    private User user;
}
