package com.eden.bonvoyage.http.controllers.room;

import com.eden.bonvoyage.core.models.room.Room;
import com.eden.bonvoyage.core.models.room.RoomFilter;
import com.eden.bonvoyage.core.repository.RoomRepository;
import com.eden.bonvoyage.core.services.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
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

  @GetMapping
  List<Room> find(@Nullable @RequestBody RoomFilter filter) {
    if  (filter == null) return roomService.findAll();
    return roomService.findByFilters(filter);
  }

}
