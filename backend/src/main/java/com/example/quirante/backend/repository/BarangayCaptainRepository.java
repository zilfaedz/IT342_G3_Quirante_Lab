package com.example.quirante.backend.repository;

import com.example.quirante.backend.model.BarangayCaptain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BarangayCaptainRepository extends JpaRepository<BarangayCaptain, Long> {
    Optional<BarangayCaptain> findByUserId(Long userId);
}
