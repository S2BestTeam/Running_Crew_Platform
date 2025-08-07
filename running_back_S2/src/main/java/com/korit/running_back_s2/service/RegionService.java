package com.korit.running_back_s2.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RegionService {

    private final GunguMapper gunguMapper;


    public List<Gungu> getAllGungu() {
        return gunguMapper.getAllGungu();
    }
}
