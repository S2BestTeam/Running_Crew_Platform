package com.korit.running_back_s2.dto.crew;

import com.korit.running_back_s2.domain.crewGathering.CrewGathering;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CrewGatheringRespDto {
    private Integer crewId;
    private String title;
    private String content;
    private String crewThumbnailImg;
    private String runningDate;
    private String runningTime;
    private String placeName;
    private String address;
    private String roadAddress;
    private Integer km;
    private Integer cost;
    private Integer maxParticipants;
}
