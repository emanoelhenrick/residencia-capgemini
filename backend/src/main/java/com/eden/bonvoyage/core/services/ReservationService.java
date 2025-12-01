package com.eden.bonvoyage.core.services;

import com.eden.bonvoyage.core.exceptions.UserNotFoundException;
import com.eden.bonvoyage.core.models.reservation.InputReservation;
import com.eden.bonvoyage.core.models.reservation.Reservation;
import com.eden.bonvoyage.core.repository.ReservationRepository;
import com.eden.bonvoyage.core.repository.RoomRepository;
import com.eden.bonvoyage.core.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class ReservationService {

  @Autowired
  private ReservationRepository reservationRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private RoomRepository roomRepository;

  public Reservation createReservation(InputReservation data) {
    var user = userRepository
      .findUserByEmail(data.userEmail())
      .orElseThrow(() -> new UserNotFoundException(data.userEmail()));

    var room = roomRepository
      .findById(UUID.fromString(data.roomId()))
      .orElseThrow(() -> new RuntimeException("Room not found. ID: " + data.roomId()));

    var reservation = new Reservation(
      user,
      room,
      LocalDateTime.parse(data.initialDate()),
      LocalDateTime.parse(data.finalDate())
    );

    reservationRepository.save(reservation);

    return reservation;
  }

  public List<Reservation> findAllByUserEmail(String email) {
    var user = userRepository
      .findUserByEmail(email)
      .orElseThrow(() -> new UserNotFoundException(email));

    return user.getReservations();
  }

}
