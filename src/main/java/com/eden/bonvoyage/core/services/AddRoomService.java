package com.eden.bonvoyage.core.services;

import com.eden.bonvoyage.core.models.room.NewRoomDTO;
import com.eden.bonvoyage.core.models.room.Room;
import com.eden.bonvoyage.core.repository.PropertyRepository;
import com.eden.bonvoyage.core.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddRoomService {

  @Autowired
  private RoomRepository roomRepository;

  @Autowired
  private PropertyRepository propertyRepository;

  public Room run(NewRoomDTO data, String hostEmail) {
    var property = propertyRepository
      .findById(data.propertyId())
      .orElseThrow(() -> new RuntimeException("property not found"));

    var isSameHost = property.getHost().getEmail().equals(hostEmail);

    if (!isSameHost) throw new RuntimeException("host mismatch");

    var newRoom = new Room(data);
    newRoom.setProperty(property);
    roomRepository.save(newRoom);
    return newRoom;
  }

}
