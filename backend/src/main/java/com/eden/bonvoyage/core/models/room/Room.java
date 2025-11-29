package com.eden.bonvoyage.core.models.room;

import com.eden.bonvoyage.core.models.accommodation.Accommodation;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
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
  private String img;

  @ElementCollection(targetClass = Amenities.class)
  @Enumerated(EnumType.STRING)
  @CollectionTable(
    name = "room_amenities",
    joinColumns = @JoinColumn(name = "room_id")
  )
  @Column(name = "amenities")
  private List<Amenities> amenities = new ArrayList<>();

  @ElementCollection(targetClass = Vibe.class)
  @Enumerated(EnumType.STRING)
  @CollectionTable(
    name = "room_vibes",
    joinColumns = @JoinColumn(name = "room_id")
  )
  @Column(name = "vibe")
  private List<Vibe> vibe = new ArrayList<>();

  @ManyToOne
  @JoinColumn(nullable = false)
  @JsonIgnore
  private Accommodation accommodation;

  @JsonProperty("accommodation")
  public Object getAccommodationSummary() {
    return new Object() {
      public final UUID id = accommodation.getId();
      public final String name = accommodation.getName();
    };
  }
}
