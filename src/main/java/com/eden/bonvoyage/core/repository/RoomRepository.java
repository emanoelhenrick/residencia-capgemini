package com.eden.bonvoyage.core.repository;

import com.eden.bonvoyage.core.models.room.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface RoomRepository extends JpaRepository<Room, UUID> {
}
