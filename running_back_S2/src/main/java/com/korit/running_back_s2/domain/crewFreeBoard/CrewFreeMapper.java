package com.korit.running_back_s2.domain.crewFreeBoard;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CrewFreeMapper {

    List<CrewFree> findAllFreeListBySearchOption(CrewFreeSearchOption opt);

    Integer countFreeListsBySearchOption(CrewFreeSearchOption opt);

    CrewFree findByFreeId(Integer freeId);

    void insert(CrewFree crewFree);

    List<CrewFree> findDetailById(@Param("crewId") int crewId, @Param("freeId") int freeId);
}
