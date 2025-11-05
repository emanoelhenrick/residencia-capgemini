package com.eden.bonvoyage.http.controllers.property;

import com.eden.bonvoyage.core.models.property.NewPropertyDTO;
import com.eden.bonvoyage.core.models.property.PropertyIdDTO;
import com.eden.bonvoyage.core.models.room.NewRoomDTO;
import com.eden.bonvoyage.core.models.room.RoomIdDTO;
import com.eden.bonvoyage.core.services.AddRoomService;
import com.eden.bonvoyage.core.services.property.AddPropertyService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/property")
public class PropertyController {

  @Autowired
  private AddPropertyService addPropertyService;

  @Autowired
  private AddRoomService addRoomService;

  @PostMapping
  public ResponseEntity<PropertyIdDTO> addPropertyService(
    @RequestBody @Valid NewPropertyDTO data, Authentication auth
  ) {
    var newProperty = addPropertyService.run(data, auth.getName());
    return ResponseEntity
      .status(HttpStatus.CREATED)
      .body(new PropertyIdDTO(newProperty.getId().toString()));
  }

  @PostMapping("/new-room")
  public ResponseEntity<RoomIdDTO> addRoom(@RequestBody NewRoomDTO data, Authentication auth) {
    var newRoom = addRoomService.run(data, auth.getName());
    return ResponseEntity.status(HttpStatus.CREATED).body(new RoomIdDTO(newRoom.getId().toString()));
  }

}
