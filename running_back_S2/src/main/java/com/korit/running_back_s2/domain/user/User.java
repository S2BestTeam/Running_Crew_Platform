package com.korit.running_back_s2.domain.user;

import com.korit.running_back_s2.domain.gungu.Gungu;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private Integer userId;
    private String email;
    private String oauthType;
    private String fullName;
    private String phoneNumber;
    private String nickname;
    private LocalDate birthDate;
    private Integer gender;
    private String profileImg;
    private Integer gunguId;
    private Integer roleId;
    private String providerId;

    private Gungu gungu;
}
