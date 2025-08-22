package com.korit.running_back_s2.domain.member;

import com.korit.running_back_s2.dto.member.ExistsCheckReqDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MemberMapper {
    int insert(Member member);
    List<Member> findAllMembersBySearchOption(MemberSearchOption opt);
    Integer countMembersBySearchOption(MemberSearchOption opt);
    boolean existsFind(ExistsCheckReqDto dto);
    Member findById(Integer memberId);
    int updateRole(@Param("memberId") Integer memberId, @Param("roleId") Integer roleId);
    int deleteMember(Integer memberId);
    void insertLeaderRole(Integer userId, Integer crewId);
    int countMember(Integer crewId);

    Integer findMemberIdByUserId(Integer crewId, Integer userId);
}
