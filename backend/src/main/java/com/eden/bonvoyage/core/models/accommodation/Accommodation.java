package com.eden.bonvoyage.core.models.accommodation;

import com.eden.bonvoyage.core.models.room.Room;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "accommodation")
public class Accommodation {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  private String name;
  private String description;
  private String location;
  private double rating;
  private String img;

  @OneToMany(mappedBy = "accommodation", fetch = FetchType.LAZY)
  private List<Room> rooms = new ArrayList<>();

}
