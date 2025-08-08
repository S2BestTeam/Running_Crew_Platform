package com.korit.running_back_s2.security.handler;

import com.korit.running_back_s2.domain.user.User;
import com.korit.running_back_s2.domain.user.UserMapper;
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
    private final UserMapper userMapper;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        PrincipalUser principalUser = (PrincipalUser) authentication.getPrincipal();
        User user = principalUser.getUser();
        String redirectUrl;

        User foundUser = userMapper.findByEmail(user.getEmail());
        if (foundUser == null) {
            String email = URLEncoder.encode(user.getEmail(), StandardCharsets.UTF_8);
            String oauthType = URLEncoder.encode(user.getOauthType(), StandardCharsets.UTF_8);
            String img = URLEncoder.encode(user.getProfileImg(), StandardCharsets.UTF_8);
            String providerId = URLEncoder.encode(user.getProviderId(), StandardCharsets.UTF_8);
            redirectUrl = String.format("http://localhost:5173/auth/oauth2/signup?email=%s&providerId=%s&oauthType=%s&img=%s" ,email,providerId,oauthType,img);
        } else {
            String accessToken = jwtUtil.generateAccessToken(foundUser);
            redirectUrl = String.format("http://localhost:5173/auth/oauth2/signin?accessToken=%s", accessToken);
        }

        response.sendRedirect(redirectUrl);
    }
}
