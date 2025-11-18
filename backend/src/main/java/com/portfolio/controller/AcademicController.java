package com.portfolio.controller;

import com.portfolio.entity.Academic;
import com.portfolio.service.AcademicService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/academics")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AcademicController {
    private final AcademicService academicService;

    @GetMapping
    public ResponseEntity<List<Academic>> getAllAcademics(@RequestParam(required = false) String type) {
        if (type != null && !type.isEmpty()) {
            return ResponseEntity.ok(academicService.getAcademicsByType(type));
        }
        return ResponseEntity.ok(academicService.getAllAcademics());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Academic> getAcademicById(@PathVariable Long id) {
        return academicService.getAcademicById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Academic> createAcademic(@RequestBody Academic academic) {
        Academic created = academicService.createAcademic(academic);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Academic> updateAcademic(@PathVariable Long id, @RequestBody Academic academic) {
        try {
            Academic updated = academicService.updateAcademic(id, academic);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAcademic(@PathVariable Long id) {
        academicService.deleteAcademic(id);
        return ResponseEntity.noContent().build();
    }
}
