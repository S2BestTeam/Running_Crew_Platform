package com.korit.running_back_s2.security.handler;

import com.korit.running_back_s2.domain.authUser.AuthUser;
import com.korit.running_back_s2.security.jwt.JwtUtil;
import com.korit.running_back_s2.security.model.PrincipalUser;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtUtil jwtUtil;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        PrincipalUser principalUser = (PrincipalUser) authentication.getPrincipal();
        AuthUser authUser = principalUser.getAuthUser();
        String accessToken = jwtUtil.generateAccessToken(authUser);
        String email = URLEncoder.encode(authUser.getEmail(), StandardCharsets.UTF_8);
        String name = URLEncoder.encode(authUser.getFullName(), StandardCharsets.UTF_8);
        String providerId = URLEncoder.encode(authUser.getProviderId(), StandardCharsets.UTF_8);
        String redirectUrl = String.format("http://localhost:5173/auth/oauth2/login?accessToken=%s&email=%s&name=%s&providerId=%s"
                ,accessToken,email,name,providerId);

        response.sendRedirect(redirectUrl);
    }
}
