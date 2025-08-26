package com.korit.running_back_s2.domain.notice;


import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CrewNoticeMapper {
    void insert(CrewNotice crewNotice);
    
    List<CrewNotice> findAllNoticeListBySearchOption(CrewNoticeSearchOption opt);

    Integer countNoticeListsBySearchOption(CrewNoticeSearchOption opt);

    CrewNotice findByNoticeId (Integer NoticeId);

    List<CrewNotice> findDetailById(@Param("crewId") int crewId, @Param("NoticeId") int NoticeId);
}
