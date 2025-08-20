package com.korit.running_back_s2.domain.gathering;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface GatheringMapper {
    int insert(Gathering gathering);
}
