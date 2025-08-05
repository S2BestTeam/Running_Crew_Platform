package com.korit.running_back_s2.security.handler;

import com.korit.running_back_s2.domain.userInfo.UserInfo;
import com.korit.running_back_s2.domain.userInfo.UserInfoMapper;
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
    private final UserInfoMapper userInfoMapper;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        PrincipalUser principalUser = (PrincipalUser) authentication.getPrincipal();
        UserInfo userInfo = principalUser.getUserInfo();
        String redirectUrl;

        UserInfo foundUserInfo = userInfoMapper.findByUseEmail(userInfo.getEmail());
        if (foundUserInfo == null) {
            String email = URLEncoder.encode(userInfo.getEmail(), StandardCharsets.UTF_8);
            String name = URLEncoder.encode(userInfo.getFullName(), StandardCharsets.UTF_8);
            String oauthType = URLEncoder.encode(userInfo.getOauthType(), StandardCharsets.UTF_8);
            redirectUrl = String.format("http://localhost:5173/auth/oauth2/signup?email=%s&name=%s&oauthType=%s" ,email,name,oauthType);
        } else {
            String accessToken = jwtUtil.generateAccessToken(foundUserInfo);
            redirectUrl = String.format("http://localhost:5173/main?accessToken=%s", accessToken);
        }

        response.sendRedirect(redirectUrl);
    }
}
