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

import java.time.DateTimeException;
import java.time.LocalDate;
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
        String birthyear = null;
        String birthday = null;
        LocalDate birthDate = null;

        OAuth2User oAuth2User = super.loadUser(userRequest);

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
            birthday = kakaoAccount.get("birthday").toString();
            birthyear = kakaoAccount.get("birthyear").toString();
            providerId = attributes.get("id").toString();
            img = profile.get("thumbnail_image_url").toString();

            if (birthyear != null && birthday != null) {
                String month = birthday.substring(0, 2);
                String day = birthday.substring(2, 4);

                try {
                    LocalDate birthDateLocal = LocalDate.of(
                            Integer.parseInt(birthyear),
                            Integer.parseInt(month),
                            Integer.parseInt(day)
                    );
                    birthDate = birthDateLocal;
                } catch (DateTimeException e) {
                    birthDate = null;
                }
            }
        }
        else if ("naver".equals(registrationId)) {
            Map<String, Object> response = (Map<String, Object>) oAuth2User.getAttributes().get("response");

            providerId = response.get("id").toString();
            email = response.get("email").toString();
            Object profileImageObj = response.get("profile_image").toString();
            img = profileImageObj != null ? profileImageObj.toString() : "/images/default-profile.png";
            birthyear = response.get("birthyear").toString();
            birthday = response.get("birthday").toString();

            if (birthyear != null && birthday != null) {
                String[] parts = birthday.split("-");
                if (parts.length == 2) {
                    try {
                        LocalDate birthDateLocal = LocalDate.of(
                                Integer.parseInt(birthyear),
                                Integer.parseInt(parts[0]),
                                Integer.parseInt(parts[1])
                        );
                        birthDate = birthDateLocal;
                    } catch (DateTimeException e) {
                        birthDate = null; // 형식 잘못된 경우
                    }
                }
            }
        }
        
        User user = User.builder()
                .email(email)
                .oauthType(registrationId)
                .profileImg(img)
                .providerId(providerId)
                .birthDate(birthDate)
                .build();

        return new PrincipalUser(user, oAuth2User.getAttributes());
    }
}
