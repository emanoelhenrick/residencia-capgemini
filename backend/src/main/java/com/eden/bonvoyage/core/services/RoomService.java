package com.eden.bonvoyage.core.services;

import com.eden.bonvoyage.core.models.room.Room;
import com.eden.bonvoyage.core.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

  @Autowired
  private RoomRepository roomRepository;

  List<Room> findAll() {
    return roomRepository.findAll();
  }

}
