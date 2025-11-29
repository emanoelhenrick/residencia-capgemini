package com.eden.bonvoyage.core.models.room;

import java.util.List;

public record RoomFilter(
  List<Vibe> vibe,
  double initialPrice,
  double endPrice,
  String Location,
  int roomsNumber,
  double minimiumRating
) {
}
