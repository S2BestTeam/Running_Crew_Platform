package com.korit.running_back_s2.domain.gungu;

import org.apache.ibatis.annotations.Mapper;

<<<<<<< HEAD
@Mapper
public interface GunguMapper {
    Integer findGunguIdByName(String gunguName);
}
=======
import java.util.List;

@Mapper
public interface GunguMapper {
    List<Gungu> getAllGungu();
    Integer findGunguIdByName(String gunguName);
}
>>>>>>> origin/20-crew-register
