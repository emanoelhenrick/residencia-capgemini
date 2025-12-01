package com.eden.bonvoyage.core.services;

import com.eden.bonvoyage.core.models.accommodation.Accommodation;
import com.eden.bonvoyage.core.repository.AccommodationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class AccommodationService {

  @Autowired
  private AccommodationRepository accommodationRepository;

  public List<Accommodation> findAll() {
    return accommodationRepository.findAll();
  }

  public Accommodation findById(String id) {
    return accommodationRepository
      .findById(UUID.fromString(id))
      .orElseThrow(() -> new RuntimeException("Accommodation not found"));
  }

}
