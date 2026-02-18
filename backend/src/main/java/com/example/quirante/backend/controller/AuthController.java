package com.example.quirante.backend.controller;

import com.example.quirante.backend.model.User;
import com.example.quirante.backend.repository.UserRepository;
import com.example.quirante.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already in use");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "User registered successfully"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        // Try to find user by email
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            String token = jwtUtil.generateToken(user.get().getEmail());
            return ResponseEntity.ok(Map.of(
                    "message", "Login successful",
                    "token", token,
                    "email", user.get().getEmail(),
                    "firstName", user.get().getFirstName() != null ? user.get().getFirstName() : "",
                    "lastName", user.get().getLastName() != null ? user.get().getLastName() : ""));
        }
        throw new org.springframework.security.authentication.BadCredentialsException("Invalid credentials");
    }
}
