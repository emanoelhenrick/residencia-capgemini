package com.eden.bonvoyage.core.services;

import com.eden.bonvoyage.core.models.room.Room;
import com.eden.bonvoyage.core.models.room.RoomFilter;
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

  public List<Room> findByFilters(RoomFilter filter) {
    List<Room> rooms = roomRepository.findAll();

    return rooms.stream()
      // vibes
      .filter(room -> {
        if (filter.vibe() == null || filter.vibe().isEmpty()) return true;
        return room.getVibe().containsAll(filter.vibe());
      })
      // amenities
      .filter(room -> {
        if (filter.amenities() == null || filter.amenities().isEmpty()) return true;
        return room.getAmenities().containsAll(filter.amenities());
      })
      // preco
      .filter(room -> {
        double price = room.getPricePerNight();
        double min = filter.initialPrice();
        double max = filter.endPrice();

        boolean okMin = (min <= 0) || price >= min;
        boolean okMax = (max <= 0) || price <= max;

        return okMin && okMax;
      })
      // location
      .filter(room -> {
        if (filter.Location() == null || filter.Location().isBlank()) return true;

        String loc = filter.Location().toLowerCase();
        return room.getAccommodation().getLocation().toLowerCase().contains(loc);
      })
      // rating
      .filter(room -> {
        if (filter.minimiumRating() <= 0) return true;
        return room.getAccommodation().getRating() >= filter.minimiumRating();
      })
      .toList();
  }


}
