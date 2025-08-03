package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.authUser.AuthUser;
import com.korit.running_back_s2.domain.authUser.AuthUserMapper;
import com.korit.running_back_s2.security.model.PrincipalUser;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class OAuth2UserService extends DefaultOAuth2UserService {

    private final AuthUserMapper authUserMapper;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        String name = null;
        String email = null;
        String providerId = null;

        OAuth2User oAuth2User = super.loadUser(userRequest);

        // OAuth 제공자별 정보 추출
        if ("google".equals(registrationId)) {
            email = oAuth2User.getAttribute("email");
            name = oAuth2User.getAttribute("name");
            providerId = oAuth2User.getAttribute("sub");
        }
        else if ("kakao".equals(registrationId)) {
            Map<String, Object> attributes = oAuth2User.getAttributes();
            Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
            Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");

            email = kakaoAccount.get("email").toString();
            name = profile.get("nickname").toString();
            providerId = attributes.get("id").toString();
        }

        // DB에서 기존 사용자 확인 또는 새로 저장
        AuthUser authUser = authUserMapper.findByUsername(email);

        if (authUser == null) {
            AuthUser newOAuthUser = AuthUser.builder()
                    .providerId(providerId)
                    .email(email)
                    .oauthType(registrationId)
                    .fullName(name)
                    .build();

        authUserMapper.insert(newOAuthUser);

        authUser = authUserMapper.findByUsername(email);
        }

        return PrincipalUser.builder()
                .authUser(authUser)
                .attributes(oAuth2User.getAttributes())
                .build();
    }
}
