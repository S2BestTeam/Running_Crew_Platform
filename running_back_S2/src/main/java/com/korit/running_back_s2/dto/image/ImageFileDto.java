package com.korit.running_back_s2.dto.image;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ImageFileDto {
    private String fileName;
    private String url;
    private long size;
    private String contentType;
    private Instant lastModifiedAt;
}
