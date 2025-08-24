package com.korit.running_back_s2.domain.board;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BoardMapper {
    void insert(FreeBoard freeBoard);
}
