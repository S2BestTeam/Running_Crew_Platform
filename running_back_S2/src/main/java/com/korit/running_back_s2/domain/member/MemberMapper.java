package com.korit.running_back_s2.domain.member;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MemberMapper {
    int insert(Member member);
    List<Member> findAllMembersBySearchOption(MemberSearchOption opt);
    Integer countMembersBySearchOption(MemberSearchOption opt);
    Member findByMemberId(Integer memberId);
    boolean findByUserId(Integer userId);
    int updateRole(@Param("memberId") Integer memberId, @Param("roleId") Integer roleId);
    int deleteMember(Integer memberId);
    void insertLeaderRole(Integer userId, Integer crewId);
}
