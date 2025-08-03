package com.korit.running_back_s2.domain.authUser;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder

@AllArgsConstructor
@NoArgsConstructor
public class AuthUser {
    private Integer authUserId;
    private String email;
    private String oauthType;
    private String fullName;
    private String providerId;
    private LocalDateTime createdAt;
}
