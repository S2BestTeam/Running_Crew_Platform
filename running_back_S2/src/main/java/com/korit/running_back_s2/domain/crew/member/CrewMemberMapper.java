package com.korit.running_back_s2.domain.crew.member;

import com.korit.running_back_s2.dto.crew.CrewMemberDetailRespDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CrewMemberMapper {
    int insert(CrewMember member);
    List<CrewMember> findAllMembersBySearchOption(CrewMemberSearchOption opt);
    Integer countMembersBySearchOption(CrewMemberSearchOption opt);
    CrewMemberDetailRespDto findMemberDetail(@Param("crewId") Integer crewId, @Param("userId") Integer userId);
    int updateRoleUp(@Param("crewId") Integer crewId,
                             @Param("userId") Integer userId);

    int deleteMember(@Param("crewId") Integer crewId,
                              @Param("userId") Integer userId);
    void insertLeaderRole(Integer userId, Integer crewId);
    int report(Report report);

    int updateRoleDown(Integer crewId, Integer userId);

    void insertLeaderRole(Integer userId, Integer crewId);
}
