package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.region.Gungu;
import com.korit.running_back_s2.domain.region.RegionMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RegionService {

    private final RegionMapper regionMapper;


    public List<Gungu> getAllGungu() {
        return regionMapper.getAllGungu();
    }
}
