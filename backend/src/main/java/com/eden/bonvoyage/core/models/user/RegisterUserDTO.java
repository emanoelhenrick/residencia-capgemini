package com.eden.bonvoyage.core.models.user;

public record RegisterUserDTO(
  String name,
  String email,
  String password
) {
}
