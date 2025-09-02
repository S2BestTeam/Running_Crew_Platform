package com.korit.running_back_s2.domain.ask;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AskCommentMapper {
    int insert(AskComment askComment);
    List<AskComment> findAllByAskId(Integer askId);
    int updateCommentStatus(Integer askCommentId);
}