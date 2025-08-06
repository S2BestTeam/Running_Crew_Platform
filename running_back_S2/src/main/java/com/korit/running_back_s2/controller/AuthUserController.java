package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.domain.authUser.AuthUser;
import com.korit.running_back_s2.security.model.PrincipalUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/authUser")
@RequiredArgsConstructor
public class AuthUserController {

    @GetMapping("/me")
    public ResponseEntity<?> getMe(@AuthenticationPrincipal PrincipalUser principalUser) {
        // AuthUser authUser = principalUser.getAuthUser();
        // System.out.println(authUser);
        return ResponseEntity.ok("null");
    }
}
