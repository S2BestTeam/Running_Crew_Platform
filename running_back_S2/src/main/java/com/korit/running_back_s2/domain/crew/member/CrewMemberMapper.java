package com.korit.running_back_s2.domain.crew.member;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CrewMemberMapper {
    List<CrewMember> findAllMembersBySearchOption(CrewMemberSearchOption opt);
    Integer countMembersBySearchOption(CrewMemberSearchOption opt);
    CrewMemberDetailResp findMemberDetail(@Param("crewId") Integer crewId, @Param("userId") Integer userId);
    int updateRole(@Param("crewId") Integer crewId,
                             @Param("userId") Integer userId);

    int deleteMember(@Param("crewId") Integer crewId,
                              @Param("userId") Integer userId);

    int report(Report report);
}
