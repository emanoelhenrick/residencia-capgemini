package com.eden.bonvoyage.core.models.room;

import java.util.List;

public record RoomFilter(
  List<Vibe> vibe,
  List<Amenities> amenities,
  double initialPrice,
  double endPrice,
  String Location,
  double minimiumRating
) {
}
