package com.korit.running_back_s2.service;

import com.korit.running_back_s2.dto.image.GalleryService;
import com.korit.running_back_s2.dto.image.ImageFileDto;
import com.korit.running_back_s2.util.AppProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class GalleryServiceImpl implements GalleryService {

    private final AppProperties props;

    @Override
    public List<ImageFileDto> listCrewFreeImages() {
        AppProperties.ImageConfig cfg = props.get("crewFreeBoard");
        if (cfg == null) return List.of();

        Path dir = Paths.get(cfg.getDirPath()).toAbsolutePath().normalize();
        if (!Files.exists(dir)) return List.of();

        try (Stream<Path> s = Files.list(dir)) {
            String prefix = cfg.getPrefix().replaceAll("/+$", "");

            return s.filter(Files::isRegularFile)
                    .filter(p -> {
                        String n = p.getFileName().toString().toLowerCase();
                        return n.endsWith(".jpg") || n.endsWith(".jpeg")
                                || n.endsWith(".png") || n.endsWith(".webp")
                                || n.endsWith(".gif");
                    })
                    .sorted(Comparator.comparingLong((Path p) -> p.toFile().lastModified()).reversed())
                    .map(p -> {
                        String fileName = p.getFileName().toString();
                        String url = prefix + "/" + fileName; // <img src> 바로 사용
                        String ct;
                        try { ct = Files.probeContentType(p); } catch (IOException e) { ct = "application/octet-stream"; }
                        return ImageFileDto.builder()
                                .fileName(fileName)
                                .url(url)
                                .size(p.toFile().length())
                                .contentType(ct)
                                .lastModifiedAt(Instant.ofEpochMilli(p.toFile().lastModified()))
                                .build();
                    })
                    .toList();
        } catch (IOException e) {
            return List.of();
        }
    }
}

