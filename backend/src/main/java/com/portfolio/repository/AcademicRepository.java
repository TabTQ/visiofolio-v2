package com.portfolio.repository;

import com.portfolio.entity.Academic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AcademicRepository extends JpaRepository<Academic, Long> {
    List<Academic> findAllByOrderByDisplayOrderAsc();
    List<Academic> findByTypeOrderByDisplayOrderAsc(String type);
}
