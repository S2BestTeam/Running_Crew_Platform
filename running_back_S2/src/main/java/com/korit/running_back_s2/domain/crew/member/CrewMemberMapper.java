package com.korit.running_back_s2.domain.crew.member;

import com.korit.running_back_s2.dto.crew.CrewMemberDetailRespDto;
import com.korit.running_back_s2.dto.crew.CrewMemberRoleUpdateReqDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CrewMemberMapper {
    int insert(CrewMember member);
    List<CrewMember> findAllMembersBySearchOption(CrewMemberSearchOption opt);
    Integer countMembersBySearchOption(CrewMemberSearchOption opt);
    CrewMember findById(Integer memberId);
    int updateRole(@Param("memberId") Integer memberId, @Param("roleId") Integer roleId);

    int deleteMember(Integer memberId);
    int report(Report report);

    void insertLeaderRole(Integer userId, Integer crewId);
}
