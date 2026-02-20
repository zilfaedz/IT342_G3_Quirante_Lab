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
import org.springframework.http.ResponseEntity;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:3001" })
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/me")
    public User getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return userRepository.findByEmail(auth.getName()).orElse(null);
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

        userRepository.save(currentUser);

        return ResponseEntity.ok(Map.of(
                "message", "Profile updated successfully",
                "user", currentUser));
    }
}
