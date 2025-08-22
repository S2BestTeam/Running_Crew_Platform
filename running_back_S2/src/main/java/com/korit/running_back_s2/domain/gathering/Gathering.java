package com.korit.running_back_s2.domain.gathering;

import com.korit.running_back_s2.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Gathering {
    private Integer gatheringId;
    private Integer crewId;
    private Integer userId;
    private String title;
    private String content;
    private String thumbnailPicture;
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
    private Integer status;
    private LocalDateTime createdAt;

    private Integer currentParticipants;
    private Boolean isAttending;
    private User user;
}
