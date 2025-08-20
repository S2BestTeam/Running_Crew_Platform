package com.korit.running_back_s2.controller;

import com.korit.running_back_s2.dto.gathering.GatheringRegisterReqDto;
import com.korit.running_back_s2.dto.response.ResponseDto;
import com.korit.running_back_s2.service.GatheringService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/crews")
@RequiredArgsConstructor
public class GatheringController {
    private final GatheringService gatheringService;

<<<<<<< HEAD:running_back_S2/src/main/java/com/korit/running_back_s2/controller/CrewGatheringController.java
    @GetMapping("/{crewId}/gatherings")
    public ResponseEntity<ResponseDto<?>> getGatherings (@PathVariable Integer crewId) {
        return ResponseEntity.ok(ResponseDto.success(crewGatheringService.getGatherings(crewId)));
    }

    @PostMapping("/{crewId}/gatherings")
    public ResponseEntity<ResponseDto<?>> register(@ModelAttribute CrewGatheringRegisterReqDto dto) {
=======
    @PostMapping("/{crewId}/gathering")
    public ResponseEntity<ResponseDto<?>> register(@ModelAttribute GatheringRegisterReqDto dto) {
>>>>>>> 26-강사피드백:running_back_S2/src/main/java/com/korit/running_back_s2/controller/GatheringController.java
        System.out.println(dto);
        gatheringService.register(dto);
        return ResponseEntity.ok(ResponseDto.success("Crew gathering registered"));
    }
}
