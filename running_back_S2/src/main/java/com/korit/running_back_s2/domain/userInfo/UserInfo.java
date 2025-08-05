package com.korit.running_back_s2.domain.userInfo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserInfo {
    private Integer userId;
    private String providerId;
    private String email;
    private String oauthType;
    private String fullName;
    private String nickName;
    private LocalDate birthDate;
    private Integer gender;
    private String profileImg;
    private Integer gunguId;
    private Integer roleId;
}
