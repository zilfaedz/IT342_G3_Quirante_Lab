package com.example.quirante.backend.controller;

import com.example.quirante.backend.model.User;
import com.example.quirante.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.ResponseEntity;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:3001" })
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/me")
    public User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = userRepository.findByEmail(auth.getName()).orElse(null);
        if (currentUser != null && ("RESIDENT".equalsIgnoreCase(currentUser.getRole())
                || "OFFICIAL".equalsIgnoreCase(currentUser.getRole())
                || "Tanod".equalsIgnoreCase(currentUser.getRole()))) {
            Optional<User> captainOpt = userRepository.findFirstByBarangayCodeAndRoleAndAccountStatusOrderByIdDesc(
                    currentUser.getBarangayCode(), "Barangay Captain", "APPROVED");
            if (captainOpt.isPresent()) {
                currentUser.setCaptainName(captainOpt.get().getFullName());
            } else {
                currentUser.setCaptainName("Not Assigned");
            }
        } else if (currentUser != null && "Barangay Captain".equalsIgnoreCase(currentUser.getRole())) {
            currentUser.setCaptainName(currentUser.getFullName());
        }
        return currentUser;
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody Map<String, String> updates) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = userRepository.findByEmail(auth.getName()).orElse(null);

        if (currentUser == null) {
            return ResponseEntity.status(404).body(Map.of("message", "User not found"));
        }

        if (updates.containsKey("firstName"))
            currentUser.setFirstName(updates.get("firstName"));
        if (updates.containsKey("lastName"))
            currentUser.setLastName(updates.get("lastName"));
        if (updates.containsKey("address"))
            currentUser.setAddress(updates.get("address"));
        if (updates.containsKey("contactNumber"))
            currentUser.setContactNumber(updates.get("contactNumber"));
        if (updates.containsKey("barangay"))
            currentUser.setBarangay(updates.get("barangay"));
        if (updates.containsKey("barangayCode"))
            currentUser.setBarangayCode(updates.get("barangayCode"));
        if (updates.containsKey("cityName"))
            currentUser.setCityName(updates.get("cityName"));
        if (updates.containsKey("cityCode"))
            currentUser.setCityCode(updates.get("cityCode"));
        if (updates.containsKey("provinceName"))
            currentUser.setProvinceName(updates.get("provinceName"));
        if (updates.containsKey("provinceCode"))
            currentUser.setProvinceCode(updates.get("provinceCode"));
        if (updates.containsKey("regionName"))
            currentUser.setRegionName(updates.get("regionName"));
        if (updates.containsKey("regionCode"))
            currentUser.setRegionCode(updates.get("regionCode"));
        if (updates.containsKey("street"))
            currentUser.setStreet(updates.get("street"));
        if (updates.containsKey("lotBlockNumber"))
            currentUser.setLotBlockNumber(updates.get("lotBlockNumber"));

        userRepository.save(currentUser);

        return ResponseEntity.ok(Map.of(
                "message", "Profile updated successfully",
                "user", currentUser));
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = userRepository.findByEmail(auth.getName()).orElse(null);

        if (currentUser == null
                || (!"OFFICIAL".equals(currentUser.getRole()) && !"Barangay Captain".equals(currentUser.getRole()))) {
            return ResponseEntity.status(403).body(Map.of("message", "Access denied"));
        }

        if (currentUser.getBarangayCode() != null && !currentUser.getBarangayCode().isEmpty()) {
            return ResponseEntity.ok(userRepository.findByBarangayCode(currentUser.getBarangayCode()));
        }

        return ResponseEntity.ok(userRepository.findAll());
    }

    @org.springframework.web.bind.annotation.PostMapping("/transfer-captain")
    public ResponseEntity<?> transferCaptain(@RequestBody Map<String, Long> payload) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = userRepository.findByEmail(auth.getName()).orElse(null);

        if (currentUser == null || !"Barangay Captain".equalsIgnoreCase(currentUser.getRole())) {
            return ResponseEntity.status(403)
                    .body(Map.of("message", "Only the Barangay Captain can transfer ownership."));
        }

        Long targetUserId = payload.get("targetUserId");
        if (targetUserId == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Target user ID is required."));
        }

        User targetUser = userRepository.findById(targetUserId).orElse(null);
        if (targetUser == null) {
            return ResponseEntity.status(404).body(Map.of("message", "Target user not found."));
        }

        if (currentUser.getBarangayCode() != null
                && !currentUser.getBarangayCode().equals(targetUser.getBarangayCode())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Target user must belong to the same barangay."));
        }

        // Perform the transfer
        targetUser.setRole("Barangay Captain");
        currentUser.setRole("RESIDENT");

        userRepository.save(targetUser);
        userRepository.save(currentUser);

        return ResponseEntity
                .ok(Map.of("message", "Captain ownership transferred successfully to " + targetUser.getFullName()));
    }

    @PutMapping("/{id}/role")
    public ResponseEntity<?> updateUserRole(@PathVariable Long id, @RequestBody Map<String, String> updates) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = userRepository.findByEmail(auth.getName()).orElse(null);

        if (currentUser == null || !"Barangay Captain".equals(currentUser.getRole())) {
            return ResponseEntity.status(403).body(Map.of("message", "Only the Captain can change roles"));
        }

        User targetUser = userRepository.findById(id).orElse(null);
        if (targetUser == null) {
            return ResponseEntity.status(404).body(Map.of("message", "User not found"));
        }

        if (updates.containsKey("role")) {
            String newRole = updates.get("role");
            // Basic safety: Don't allow changing other Captains (if there were multiple
            // somehow)
            if ("Barangay Captain".equals(targetUser.getRole()) && !currentUser.getId().equals(targetUser.getId())) {
                return ResponseEntity.status(403).body(Map.of("message", "Cannot change another Captain's role"));
            }
            targetUser.setRole(newRole);
            userRepository.save(targetUser);
        }

        return ResponseEntity.ok(Map.of(
                "message", "User role updated successfully",
                "user", targetUser));
    }
}
