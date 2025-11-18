package com.portfolio.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "academics")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Academic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String type; // Degree, Certification, Coursework, Publication

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String institution;

    @Column(nullable = false)
    private String date;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String url;

    @Column(name = "display_order")
    private Integer displayOrder = 0;
}
