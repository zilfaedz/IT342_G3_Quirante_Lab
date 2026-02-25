package com.example.quirante.backend.repository;

import com.example.quirante.backend.model.AdminAuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminAuditLogRepository extends JpaRepository<AdminAuditLog, Long> {
    List<AdminAuditLog> findByTargetUserIdOrderByTimestampDesc(Long targetUserId);
}
