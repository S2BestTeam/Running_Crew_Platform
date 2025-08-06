package com.korit.running_back_s2.dto.user;

import com.korit.running_back_s2.domain.user.User;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UserRegisterReqDto {
    private String email;
    private String oauthType;
    private String fullName;
    private String phoneNumber;
    private String nickname;
    private LocalDate birthDate;
    private Integer gender;
    private String profileImg;
    private Integer gunguId;

    public User Entity() {
        return User.builder()
                .email(email)
                .oauthType(oauthType)
                .fullName(fullName)
                .phoneNumber(phoneNumber)
                .nickname(nickname)
                .birthDate(birthDate)
                .gender(gender)
                .profileImg(profileImg)
                .gunguId(gunguId)
                .build();
    }
}
