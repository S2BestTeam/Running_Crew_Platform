package com.korit.running_back_s2.domain.crew;

import com.korit.running_back_s2.dto.crew.CrewRoleReqDto;
import com.korit.running_back_s2.dto.crew.CrewUpdateReqDto;
import com.korit.running_back_s2.dto.ranking.CrewRankingRespDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CrewMapper {
    int insert(Crew crew);

    Crew findByCrewName(String crewName);
    Crew findByCrewId(Integer crewId);
    //    int registerProfileImgById(Integer userId, String picture);
    List<Crew> findAllBySearchOption(CrewSearchOption crewSearchOption);

    int countBySearchOption(CrewSearchOption crewSearchOption);

    int checkCrew(Integer userId);

    List<CrewRankingRespDto> selectTop10CrewRankingByTotalKm();
    List<CrewRankingRespDto> selectTop10CrewRankingByMemberCount();
    List<CrewRankingRespDto> selectTop10CrewRankingByCreatedDate();

    List<CrewRoleReqDto> findRoleByUserId(Integer userId);

    String findThumbnailById(Integer crewId);
    int updateCrewThumbnailPicture(Integer crewId, String thumbnailPicture);

    String findProfileById(Integer crewId);
    int updateCrewProfilePicture(Integer crewId, String profilePicture);

    int updateCrew(CrewUpdateReqDto dto);

    int withDrawCrew(Integer crewId, Integer userId);
}