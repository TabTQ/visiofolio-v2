package com.portfolio.controller;

import com.portfolio.entity.PersonalInfo;
import com.portfolio.service.PersonalInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/personal-info")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PersonalInfoController {
    private final PersonalInfoService personalInfoService;

    @GetMapping
    public ResponseEntity<PersonalInfo> getPersonalInfo() {
        PersonalInfo info = personalInfoService.getPersonalInfo();
        if (info == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(info);
    }

    @PostMapping
    public ResponseEntity<PersonalInfo> saveOrUpdatePersonalInfo(@RequestBody PersonalInfo personalInfo) {
        PersonalInfo saved = personalInfoService.saveOrUpdatePersonalInfo(personalInfo);
        return ResponseEntity.ok(saved);
    }
}
