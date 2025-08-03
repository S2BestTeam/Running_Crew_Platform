package com.korit.running_back_s2.security.filter;

import com.korit.running_back_s2.domain.authUser.AuthUser;
import com.korit.running_back_s2.domain.authUser.AuthUserMapper;
import com.korit.running_back_s2.security.jwt.JwtUtil;
import com.korit.running_back_s2.security.model.PrincipalUser;
import io.jsonwebtoken.Claims;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtFilter implements Filter {

    private final JwtUtil jwtUtil;
    private final AuthUserMapper authUserMapper;

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;

        // OPTIONS 요청은 그대로 통과
        if (request.getMethod().equalsIgnoreCase("OPTIONS")) {
            filterChain.doFilter(servletRequest, servletResponse);
            return;
        }

        String authorization = request.getHeader("Authorization");
        authenticate(authorization);

        filterChain.doFilter(servletRequest, servletResponse);
    }

    private void authenticate(String token) {
        String validatedToken = jwtUtil.validateBearerToken(token);
        if (validatedToken == null) {
            return;
        }

        Claims claims = jwtUtil.getClaims(validatedToken);
        if (claims == null) {
            return;
        }

        setAuthentication(claims);
    }

    private void setAuthentication(Claims claims) {
        Integer userId = (Integer) claims.get("userId");
        AuthUser foundAuthUser = authUserMapper.findById(userId);
        if (foundAuthUser == null) {
            return;
        }

        // PrincipalUser 생성
        PrincipalUser principalUser = PrincipalUser.builder()
                .authUser(foundAuthUser)
                .build();

        // Spring Security Context에 인증 정보 설정
        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(principalUser, "", principalUser.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}