package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.gungu.Gungu;
import com.korit.running_back_s2.domain.gungu.GunguMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GunguService {
<<<<<<< HEAD
=======

    private final GunguMapper gunguMapper;
>>>>>>> origin/14-마이페이지-수정-기능-및-css-작업

    private final GunguMapper gunguMapper;

    public List<Gungu> getAllGungu() {
        return gunguMapper.getAllGungu();
    }
}