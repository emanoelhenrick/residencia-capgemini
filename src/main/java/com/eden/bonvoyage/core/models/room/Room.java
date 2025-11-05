package com.eden.bonvoyage.core.models.room;

import com.eden.bonvoyage.core.models.property.Property;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "room")
public class Room {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  private String number;
  private int capacity;
  private double pricePerNight;
  private String description;

  private boolean isAvailable;

  @ManyToOne
  @JoinColumn(nullable = false)
  private Property property;

  public Room(NewRoomDTO data) {
    this.number = data.number();
    this.capacity = data.capacity();
    this.pricePerNight = data.pricePerNight();
    this.description = data.description();
  }

}
