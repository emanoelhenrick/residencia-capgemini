package com.eden.bonvoyage.http.controllers.room;

import com.eden.bonvoyage.core.models.room.Room;
import com.eden.bonvoyage.core.models.room.RoomFilter;
import com.eden.bonvoyage.core.repository.RoomRepository;
import com.eden.bonvoyage.core.services.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/room")
public class RoomController {

  @Autowired
  RoomService roomService;

  @GetMapping("/filter")
  List<Room> findByFilters(@RequestBody RoomFilter filter) {
    return roomService.findByFilters(filter);
  }

}
