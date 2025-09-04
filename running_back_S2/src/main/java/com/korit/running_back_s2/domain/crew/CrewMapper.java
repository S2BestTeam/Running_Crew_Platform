package com.korit.running_back_s2.domain.crew;

import com.korit.running_back_s2.domain.member.Member;
import com.korit.running_back_s2.dto.crew.CrewRoleReqDto;
import com.korit.running_back_s2.dto.crew.CrewUpdateReqDto;
<<<<<<< HEAD
import com.korit.running_back_s2.dto.image.CrewAlbumRow;
=======
import com.korit.running_back_s2.dto.crew.SectionsLatestRaw;
>>>>>>> 110-new-기능-구현-도전
import com.korit.running_back_s2.dto.ranking.CrewRankingRespDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

@Mapper
public interface CrewMapper {
    int insert(Crew crew);

    Crew findByCrewName(String crewName);
    Crew findByCrewId(Integer crewId);
    //    int registerProfileImgById(Integer userId, String picture);
    List<Crew> findAllBySearchOption(CrewSearchOption crewSearchOption);

    int countBySearchOption(CrewSearchOption crewSearchOption);

    int checkCrew(Integer userId);

    void updateAllCrewTotalKm();

    List<CrewRankingRespDto> selectTop10CrewRankingByTotalKm();
    List<CrewRankingRespDto> selectTop10CrewRankingByMemberCount();
    List<CrewRankingRespDto> selectTop10CrewRankingByCreatedDate();

    List<CrewRoleReqDto> findRoleByUserId(Integer userId);

    String findThumbnailById(Integer crewId);
    int updateCrewThumbnailPicture(Integer crewId, String thumbnailPicture);

    String findProfileById(Integer crewId);
    int updateCrewProfilePicture(Integer crewId, String profilePicture);

    int updateCrew(CrewUpdateReqDto dto);

<<<<<<< HEAD
    List<CrewAlbumRow> findContentsByCrewId(@Param("crewId") int crewId);

=======
    SectionsLatestRaw selectSectionsLatest(@Param("crewId") Integer crewId);
>>>>>>> 110-new-기능-구현-도전


//    int withDrawCrew(Integer crewId, Integer userId);
}