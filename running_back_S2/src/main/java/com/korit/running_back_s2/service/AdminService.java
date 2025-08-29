package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.user.User;
import com.korit.running_back_s2.domain.user.UserMapper;
import com.korit.running_back_s2.dto.user.UserSearchReqDto;
import com.korit.running_back_s2.dto.user.UserSearchRespDto;
import com.korit.running_back_s2.util.ImageUrlUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final ImageUrlUtil imageUrlUtil;
    private final UserMapper userMapper;

    public UserSearchRespDto searchUser(UserSearchReqDto dto) {
        Integer totalElements = userMapper.getCountOfOptions(dto.toOption());
        Integer totalPages = (int) Math.ceil(totalElements.doubleValue() / dto.getSize().doubleValue());
        List<User> foundUsers = userMapper.findAllOfOptions(dto.toOption()).stream().map(user -> {
            user.setPicture(imageUrlUtil.buildImageUrl(user.getPicture(), "profile"));
            return user;
        }).collect(Collectors.toList());
        
        boolean isLast = dto.getPage().equals(totalPages);

        return UserSearchRespDto.builder()
                .contents(foundUsers)
                .totalElements(totalElements)
                .totalPages(totalPages)
                .page(dto.getPage())
                .size(dto.getSize())
                .isLast(isLast)
                .build();
    }
}
