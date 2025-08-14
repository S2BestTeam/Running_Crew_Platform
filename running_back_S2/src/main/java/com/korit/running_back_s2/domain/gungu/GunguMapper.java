package com.korit.running_back_s2.domain.gungu;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface GunguMapper {
    Integer findGunguIdByName(String gunguName);
}
