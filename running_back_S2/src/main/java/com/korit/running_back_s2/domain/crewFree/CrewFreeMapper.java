package com.korit.running_back_s2.domain.crewFree;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CrewFreeMapper {

    List<CrewFree> findAllFreeListBySearchOption(CrewFreeSearchOption opt);

    Integer countFreeListsBySearchOption(CrewFreeSearchOption opt);

    CrewFree findByFreeId(Integer freeId);
}
