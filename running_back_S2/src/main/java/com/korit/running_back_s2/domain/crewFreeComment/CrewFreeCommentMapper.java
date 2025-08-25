package com.korit.running_back_s2.domain.crewFreeComment;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CrewFreeCommentMapper {
    void insert(CrewFreeComment freeComment);

    List<CrewFreeComment> getCommentList(Integer freeId);
}
