package com.korit.running_back_s2.dto.crew;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class CrewRegisterReqDto {
    private Integer gunguId;
    private String crewName;
    private String crewDescription;
    private MultipartFile crewImgPath;
    private Integer userId;
}