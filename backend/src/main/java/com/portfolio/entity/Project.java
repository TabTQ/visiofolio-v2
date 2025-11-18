package com.portfolio.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "projects")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "image_hint", columnDefinition = "TEXT")
    private String imageHint;

    @Column(columnDefinition = "TEXT")
    private String tags; // Stored as comma-separated values

    @Column(name = "live_url")
    private String liveUrl;

    @Column(name = "repo_url")
    private String repoUrl;

    @Column(nullable = false)
    private String type;

    @Column(name = "display_order")
    private Integer displayOrder = 0;
}
