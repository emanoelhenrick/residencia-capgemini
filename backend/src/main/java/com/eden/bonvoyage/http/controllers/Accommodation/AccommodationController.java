package com.eden.bonvoyage.http.controllers.Accommodation;

import com.eden.bonvoyage.core.models.accommodation.Accommodation;
import com.eden.bonvoyage.core.services.AccommodationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/accommodation")
public class AccommodationController {

  @Autowired
  private AccommodationService accommodationService;

  @GetMapping
  List<Accommodation> findAll() {
    return accommodationService.findAll();
  }

  @GetMapping("/{id}")
  List<Accommodation> findAll(@PathVariable String id) {
    return accommodationService.findById(id);
  }

}
