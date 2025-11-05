package com.eden.bonvoyage.core.models.property;

import com.eden.bonvoyage.core.models.room.Room;
import com.eden.bonvoyage.core.models.user.User;
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
@Table(name = "property")
public class Property {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  private String name;
  private String description;

  private String address;

  private double averageRating;

  private boolean isEnable;

  @OneToMany(mappedBy = "property", fetch = FetchType.LAZY)
  private List<Room> rooms = new ArrayList<>();

  @ManyToOne(fetch = FetchType.LAZY)
  private User host;

  public Property(NewPropertyDTO data) {
    this.name = data.name();
    this.address = data.address();
    this.description = data.description();
    this.isEnable = true;
  }

}
