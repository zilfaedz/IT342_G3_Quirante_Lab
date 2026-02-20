package com.example.quirante.backend.controller;

import com.example.quirante.backend.model.EmergencyReport;
import com.example.quirante.backend.model.User;
import com.example.quirante.backend.repository.EmergencyReportRepository;
import com.example.quirante.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:3001" })
public class ReportController {

    @Autowired
    private EmergencyReportRepository reportRepository;

    @Autowired
    private UserRepository userRepository;

    private final String UPLOAD_DIR = "uploads/";

    @PostMapping
    public ResponseEntity<?> submitReport(
            @RequestParam("description") String description,
            @RequestParam("location") String location,
            @RequestParam("incidentType") String incidentType,
            @RequestParam(value = "photo", required = false) MultipartFile photo) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = userRepository.findByEmail(auth.getName()).orElse(null);

        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "User not authenticated"));
        }

        EmergencyReport report = new EmergencyReport();
        report.setUser(currentUser);
        report.setDescription(description);
        report.setLocation(location);
        report.setIncidentType(incidentType);

        if (photo != null && !photo.isEmpty()) {
            try {
                // Ensure upload directory exists
                Path uploadPath = Paths.get(UPLOAD_DIR);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                // Generate a unique filename
                String originalFileName = StringUtils.cleanPath(photo.getOriginalFilename());
                String fileExtension = "";
                if (originalFileName.contains(".")) {
                    fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
                }
                String newFileName = UUID.randomUUID().toString() + fileExtension;

                Path filePath = uploadPath.resolve(newFileName);
                Files.copy(photo.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

                report.setPhotoUrl("/uploads/" + newFileName);

            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Map.of("message", "Failed to upload photo: " + e.getMessage()));
            }
        }

        reportRepository.save(report);

        return ResponseEntity.ok(Map.of(
                "message", "Emergency report submitted successfully",
                "report", report));
    }

    @GetMapping
    public ResponseEntity<?> getReports() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = userRepository.findByEmail(auth.getName()).orElse(null);

        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "User not authenticated"));
        }

        List<EmergencyReport> reports;

        // If OFFICIAL, return all; if RESIDENT, return only theirs
        if ("OFFICIAL".equals(currentUser.getRole())) {
            reports = reportRepository.findAllByOrderByCreatedAtDesc();
        } else {
            reports = reportRepository.findByUserIdOrderByCreatedAtDesc(currentUser.getId());
        }

        return ResponseEntity.ok(reports);
    }
}
