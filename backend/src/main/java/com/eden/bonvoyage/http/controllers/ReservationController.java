package com.eden.bonvoyage.http.controllers;

import com.eden.bonvoyage.core.models.reservation.InputReservation;
import com.eden.bonvoyage.core.models.reservation.Reservation;
import com.eden.bonvoyage.core.services.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservation")
public class ReservationController {

  @Autowired
  private ReservationService reservationService;

  @PostMapping
  public ResponseEntity<Reservation> createReservation(@RequestBody InputReservation data) {
    var reservation = reservationService.createReservation(data);
    return ResponseEntity.status(HttpStatus.CREATED).body(reservation);
  }

  @GetMapping("/{email}")
  public ResponseEntity<List<Reservation>> getAllReservationsByUserEmail(@PathVariable String email) {
    var reservations = reservationService.findAllByUserEmail(email);
    return ResponseEntity.ok(reservations);
  }

}
