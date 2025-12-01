package com.eden.bonvoyage.core.models.reservation;

public record InputReservation(
  String userEmail,
  String initialDate,
  String finalDate,
  String roomId
) {
}
