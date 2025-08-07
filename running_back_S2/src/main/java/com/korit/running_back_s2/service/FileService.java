package com.korit.running_back_s2.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileService {

    @Value("${user.dir}")
    private String rootPath;

    public String uploadFile(MultipartFile file, String dirPath) {
        if (file == null || file.isEmpty()) {
            System.out.println("파일이 null이거나 비어 있습니다.");
            return null;
        }
        String newFilename = generateRandomFilename(file.getOriginalFilename());
        // 파일 업로드 경로 생성 -> rootPath - ${user.dir} -> 프로젝트 경로
        String uploadPath = rootPath + "/upload" + dirPath;
        mkdirs(uploadPath);
        Path path = Paths.get(uploadPath + "/" + newFilename);
        try {
            Files.write(path, file.getBytes());
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

        return newFilename;
    }

    private String generateRandomFilename(String originalFilename) {
        // 새로운 파일명 만들기 위한 string builder 객체생성
        StringBuilder newFilename = new StringBuilder();
        // 겹치지 않는 새로운 파일명 생성을 위해 랜덤 UUID 문자열 생성
        newFilename.append(UUID.randomUUID().toString().replaceAll("-", ""));
        // UUID와 원본 파일명을 군부할 _(언더바) 추가
        newFilename.append("_");
        // 마지막 원본 파일명 추가
        newFilename.append(originalFilename);

        return newFilename.toString();
    }

    private void mkdirs(String path) {
        // 해당 경로를 제어할 수 있는 File 객체 생성
        File f = new File(path);
        // 해당 File 객체를 생성할 때 주입한 경로가 존재하는지 여부 확인
        if (!f.exists()) {
            // 경로가 없으면 전체 경로 폴더 생성
            f.mkdirs();
        }
    }

    public void deleteFile(String path) {
        if (path.substring(path.lastIndexOf("/")).contains("default")) {
            return;
        }
        File file = new File(rootPath + "/upload/" + path);
        if (!file.exists()) {
            return;
        }
        file.delete();
    }
}