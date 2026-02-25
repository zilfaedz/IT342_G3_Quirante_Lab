package com.example.quirante.backend.controller;

import com.example.quirante.backend.model.EvacuationCenter;
import com.example.quirante.backend.repository.EvacuationCenterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/evacuation-centers")
public class EvacuationCenterController {

    @Autowired
    private EvacuationCenterRepository centerRepository;

    // Get all centers (Public)
    @GetMapping
    public ResponseEntity<List<EvacuationCenter>> getAllCenters() {
        return ResponseEntity.ok(centerRepository.findAll());
    }

    // Create new center (Captain/Official)
    @PostMapping
    public ResponseEntity<?> createCenter(
            @RequestParam("name") String name,
            @RequestParam("latitude") Double latitude,
            @RequestParam("longitude") Double longitude,
            @RequestParam("capacity") Integer capacity,
            @RequestParam(value = "currentOccupancy", defaultValue = "0") Integer currentOccupancy,
            @RequestParam(value = "status", defaultValue = "Open") String status) {

        EvacuationCenter center = new EvacuationCenter();
        center.setName(name);
        center.setLatitude(latitude);
        center.setLongitude(longitude);
        center.setCapacity(capacity);
        center.setCurrentOccupancy(currentOccupancy);
        center.setStatus(status);

        centerRepository.save(center);
        return ResponseEntity.status(HttpStatus.CREATED).body(center);
    }

    // Update center occupancy / status (Captain/Official)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCenter(
            @PathVariable Long id,
            @RequestParam(value = "currentOccupancy", required = false) Integer currentOccupancy,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "capacity", required = false) Integer capacity) {

        Optional<EvacuationCenter> optionalCenter = centerRepository.findById(id);
        if (optionalCenter.isPresent()) {
            EvacuationCenter center = optionalCenter.get();
            if (currentOccupancy != null)
                center.setCurrentOccupancy(currentOccupancy);
            if (status != null)
                center.setStatus(status);
            if (capacity != null)
                center.setCapacity(capacity);

            centerRepository.save(center);
            return ResponseEntity.ok(center);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Evacuation Center not found.");
        }
    }

    // Delete center (Captain/Official)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCenter(@PathVariable Long id) {
        if (centerRepository.existsById(id)) {
            centerRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Evacuation Center not found.");
        }
    }
}
