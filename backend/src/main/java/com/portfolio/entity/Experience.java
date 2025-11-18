package com.portfolio.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "experiences")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Experience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String company;

    @Column(nullable = false)
    private String duration;

    @Column(nullable = false)
    private String location;

    @Column(columnDefinition = "TEXT")
    private String responsibilities; // Stored as JSON array string

    @Column(columnDefinition = "TEXT")
    private String achievements; // Stored as JSON array string

    @Column(name = "display_order")
    private Integer displayOrder = 0;
}
