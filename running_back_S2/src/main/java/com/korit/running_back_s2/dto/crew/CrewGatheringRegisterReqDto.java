package com.korit.running_back_s2.dto.crew;

import com.korit.running_back_s2.domain.crewGathering.CrewGathering;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CrewGatheringRegisterReqDto {
    private Integer crewId;
    private String title;
    private String content;
    private MultipartFile crewThumbnailImg;
    private String runningDate;
    private String runningTime;
    private String placeName;
    private String address;
    private String roadAddress;
    private String latitude;
    private String longitude;
    private Integer km;
    private Integer cost;
    private Integer maxParticipants;

    public CrewGathering toEntity() {
        return CrewGathering.builder()
                .crewId(crewId)
                .title(title)
                .content(content)
                .runningDate(runningDate)
                .runningTime(runningTime)
                .placeName(placeName)
                .address(address)
                .roadAddress(roadAddress)
                .latitude(latitude)
                .longitude(longitude)
                .km(km)
                .cost(cost)
                .maxParticipants(maxParticipants)
                .build();
    }
}
