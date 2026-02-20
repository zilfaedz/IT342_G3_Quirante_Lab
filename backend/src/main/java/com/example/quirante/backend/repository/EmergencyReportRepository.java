package com.example.quirante.backend.repository;

import com.example.quirante.backend.model.EmergencyReport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmergencyReportRepository extends JpaRepository<EmergencyReport, Long> {
    List<EmergencyReport> findAllByOrderByCreatedAtDesc();

    List<EmergencyReport> findByUserIdOrderByCreatedAtDesc(Long userId);
}
