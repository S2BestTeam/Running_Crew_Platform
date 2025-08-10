package com.korit.running_back_s2.domain.crew;

import com.korit.running_back_s2.domain.gungu.Gungu;
import com.korit.running_back_s2.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Crew {
    private Integer crewId;
    private Integer gunguId;
    private String crewName;
    private String crewDescription;
    private String crewImgPath;
    private Integer userId;

    private User user;
    private Gungu gungu;
}