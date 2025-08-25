package com.korit.running_back_s2.domain.board;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface BoardMapper {
    void insert(FreeBoard freeBoard);
    List<FreeBoard> findDetailById( @Param("crewId") int crewId, @Param("freeId") int freeId);
}
