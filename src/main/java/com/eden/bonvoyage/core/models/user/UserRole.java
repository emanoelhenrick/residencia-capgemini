package com.eden.bonvoyage.core.models.user;

import lombok.Getter;

@Getter
public enum UserRole {
  HOST("host"),
  CUSTOMER("customer"),
  ADMIN("admin");

  public final String role;

  UserRole(String role) {
    this.role = role;
  }

}
