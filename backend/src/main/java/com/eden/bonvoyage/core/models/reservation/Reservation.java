package com.eden.bonvoyage.core.models.reservation;

import com.eden.bonvoyage.core.models.room.Room;
import com.eden.bonvoyage.core.models.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "reservation")
public class Reservation {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @JsonIgnore
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  private LocalDateTime initialDate;
  private LocalDateTime finalDate;

  @ManyToOne
  @JoinColumn(name = "room_id", nullable = false)
  private Room room;

  public Reservation(User user, Room room, LocalDateTime initialDate, LocalDateTime finalDate) {
    this.user = user;
    this.room = room;
    this.initialDate = initialDate;
    this.finalDate = finalDate;
  }

}
