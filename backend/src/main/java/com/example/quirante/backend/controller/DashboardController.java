package com.example.quirante.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:3001" })
public class DashboardController {

        @GetMapping("/data")
        public ResponseEntity<?> getDashboardData() {
                return ResponseEntity.ok(Map.of(
                                "weatherAlerts", List.of(
                                                Map.of("type", "Typhoon Warning", "message",
                                                                "Typhoon Bising is approaching. Please stay indoors.",
                                                                "severity", "high"),
                                                Map.of("type", "Heavy Rainfall", "message",
                                                                "Expect heavy rainfall in the next 24 hours.",
                                                                "severity", "medium")),
                                "evacuationCenters", List.of(
                                                Map.of("name", "Barangay Hall Evacuation Center", "capacity", "500",
                                                                "status", "Open"),
                                                Map.of("name", "Local Elementary School", "capacity", "1000", "status",
                                                                "Full")),
                                "hotlines", List.of(
                                                Map.of("name", "National Emergency Hotline", "number", "911"),
                                                Map.of("name", "NDRRMC", "number", "0917-899-2222"),
                                                Map.of("name", "Red Cross", "number", "143"))));
        }
}
