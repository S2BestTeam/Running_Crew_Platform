package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.user.User;
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

    @Override
    @Transactional(rollbackFor = Exception.class)
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        String img = null;
        String email = null;
        String providerId = null;

        OAuth2User oAuth2User = super.loadUser(userRequest);
        System.out.println(oAuth2User.getAttributes());

        // OAuth 제공자별 정보 추출
        if ("google".equals(registrationId)) {
            email = oAuth2User.getAttribute("email");
            img = oAuth2User.getAttribute("picture");
            providerId = oAuth2User.getAttribute("sub");
        }
        else if ("kakao".equals(registrationId)) {
            Map<String, Object> attributes = oAuth2User.getAttributes();
            Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
            Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");

            email = kakaoAccount.get("email").toString();
            providerId = attributes.get("id").toString();
            img = profile.get("thumbnail_image_url").toString();
        }
        else if ("naver".equals(registrationId)) {
            Map<String, Object> response = (Map<String, Object>) oAuth2User.getAttributes().get("response");

            providerId = (String) response.get("id");
            email = (String) response.get("email");
            img = (String) response.get("profile_image");
        }
        
        User user = User.builder()
                .email(email)
                .oauthType(registrationId)
                .profileImg(img)
                .providerId(providerId)
                .build();

        return new PrincipalUser(user, oAuth2User.getAttributes());
    }
}
