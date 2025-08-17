package com.korit.running_back_s2.service;

import com.korit.running_back_s2.domain.crewMember.CrewMember;
import com.korit.running_back_s2.domain.crewMember.CrewMemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CrewMemberService {

    private final CrewMemberMapper crewMemberMapper;

    public void registerCrewMember(CrewMember member) {
        crewMemberMapper.insert(member);
    }
}
