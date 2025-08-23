package com.korit.running_back_s2.dto.ranking;

import lombok.Data;

@Data
public class CrewRankingRespDto {

    private Integer crewId;
    private Integer gunguId;
    private String crewName;
    private String profilePicture;
    private String thumbnailPicture;
    private Double totalKm;

    private String gunguName;
}
