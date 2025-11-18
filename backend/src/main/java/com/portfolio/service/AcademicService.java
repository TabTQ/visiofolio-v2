package com.portfolio.service;

import com.portfolio.entity.Academic;
import com.portfolio.repository.AcademicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AcademicService {
    private final AcademicRepository academicRepository;

    public List<Academic> getAllAcademics() {
        return academicRepository.findAllByOrderByDisplayOrderAsc();
    }

    public List<Academic> getAcademicsByType(String type) {
        return academicRepository.findByTypeOrderByDisplayOrderAsc(type);
    }

    public Optional<Academic> getAcademicById(Long id) {
        return academicRepository.findById(id);
    }

    @Transactional
    public Academic createAcademic(Academic academic) {
        return academicRepository.save(academic);
    }

    @Transactional
    public Academic updateAcademic(Long id, Academic academicDetails) {
        Academic academic = academicRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Academic not found with id: " + id));

        academic.setType(academicDetails.getType());
        academic.setTitle(academicDetails.getTitle());
        academic.setInstitution(academicDetails.getInstitution());
        academic.setDate(academicDetails.getDate());
        academic.setDescription(academicDetails.getDescription());
        academic.setUrl(academicDetails.getUrl());
        academic.setDisplayOrder(academicDetails.getDisplayOrder());

        return academicRepository.save(academic);
    }

    @Transactional
    public void deleteAcademic(Long id) {
        academicRepository.deleteById(id);
    }
}
