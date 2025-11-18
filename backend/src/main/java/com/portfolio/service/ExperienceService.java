package com.portfolio.service;

import com.portfolio.entity.Experience;
import com.portfolio.repository.ExperienceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ExperienceService {
    private final ExperienceRepository experienceRepository;

    public List<Experience> getAllExperiences() {
        return experienceRepository.findAllByOrderByDisplayOrderAsc();
    }

    public Optional<Experience> getExperienceById(Long id) {
        return experienceRepository.findById(id);
    }

    @Transactional
    public Experience createExperience(Experience experience) {
        return experienceRepository.save(experience);
    }

    @Transactional
    public Experience updateExperience(Long id, Experience experienceDetails) {
        Experience experience = experienceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Experience not found with id: " + id));

        experience.setTitle(experienceDetails.getTitle());
        experience.setCompany(experienceDetails.getCompany());
        experience.setDuration(experienceDetails.getDuration());
        experience.setLocation(experienceDetails.getLocation());
        experience.setResponsibilities(experienceDetails.getResponsibilities());
        experience.setAchievements(experienceDetails.getAchievements());
        experience.setDisplayOrder(experienceDetails.getDisplayOrder());

        return experienceRepository.save(experience);
    }

    @Transactional
    public void deleteExperience(Long id) {
        experienceRepository.deleteById(id);
    }
}
