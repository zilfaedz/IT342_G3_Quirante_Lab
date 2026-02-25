package com.example.quirante.backend.repository;

import com.example.quirante.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    boolean existsByBarangayCodeAndRoleAndAccountStatus(String barangayCode, String role, String accountStatus);

    Optional<User> findFirstByBarangayCodeAndRoleAndAccountStatusOrderByIdDesc(String barangayCode, String role,
            String accountStatus);

    List<User> findByRoleOrderByIdDesc(String role);

    List<User> findByBarangayCode(String barangayCode);

    List<User> findByBarangayCodeAndDirectoryOptInTrue(String barangayCode);

    long countByRole(String role);

    long countByRoleAndAccountStatus(String role, String accountStatus);
}
