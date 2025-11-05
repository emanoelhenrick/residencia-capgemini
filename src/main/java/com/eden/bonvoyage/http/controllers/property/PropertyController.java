package com.eden.bonvoyage.http.controllers.property;

import com.eden.bonvoyage.core.models.property.NewPropertyDTO;
import com.eden.bonvoyage.core.models.property.PropertyIdDTO;
import com.eden.bonvoyage.core.services.property.AddPropertyService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/property")
public class PropertyController {

  @Autowired
  private AddPropertyService addPropertyService;

  @PostMapping
  public ResponseEntity<PropertyIdDTO> addPropertyService(
    @RequestBody @Valid NewPropertyDTO data, Authentication auth
  ) {
    var newProperty = addPropertyService.run(data, auth.getName());
    return ResponseEntity
      .status(HttpStatus.CREATED)
      .body(new PropertyIdDTO(newProperty.getId().toString()));
  }

}
