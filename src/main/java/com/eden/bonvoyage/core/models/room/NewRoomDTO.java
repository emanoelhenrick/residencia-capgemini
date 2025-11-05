package com.eden.bonvoyage.core.models.room;

import java.util.UUID;

public record NewRoomDTO(
  UUID propertyId,
  String number,
  int capacity,
  double pricePerNight,
  String description
) {
}
