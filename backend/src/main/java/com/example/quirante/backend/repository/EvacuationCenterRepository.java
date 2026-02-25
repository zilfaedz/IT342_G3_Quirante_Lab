package com.example.quirante.backend.repository;

import com.example.quirante.backend.model.EvacuationCenter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EvacuationCenterRepository extends JpaRepository<EvacuationCenter, Long> {
}
