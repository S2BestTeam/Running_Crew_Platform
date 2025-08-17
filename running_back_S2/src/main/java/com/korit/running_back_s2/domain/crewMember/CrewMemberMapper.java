package com.korit.running_back_s2.domain.crewMember;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CrewMemberMapper {
    int insert(CrewMember member);
}
