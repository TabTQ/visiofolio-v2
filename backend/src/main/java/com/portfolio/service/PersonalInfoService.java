package com.portfolio.service;

import com.portfolio.entity.PersonalInfo;
import com.portfolio.repository.PersonalInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PersonalInfoService {
    private final PersonalInfoRepository personalInfoRepository;

    public PersonalInfo getPersonalInfo() {
        List<PersonalInfo> infoList = personalInfoRepository.findAll();
        return infoList.isEmpty() ? null : infoList.get(0);
    }

    @Transactional
    public PersonalInfo saveOrUpdatePersonalInfo(PersonalInfo personalInfo) {
        List<PersonalInfo> existing = personalInfoRepository.findAll();
        if (!existing.isEmpty()) {
            personalInfo.setId(existing.get(0).getId());
        }
        return personalInfoRepository.save(personalInfo);
    }
}
