package com.korit.running_back_s2.dto.response.crew;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CrewListRespDto {
    private Integer crewId;
    private String crewName;
    private String crewDescription;
    private String crewImgPath;
    private Integer userId;
    private Integer gunguId;
}
