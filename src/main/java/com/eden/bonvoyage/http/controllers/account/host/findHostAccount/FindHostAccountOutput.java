package com.eden.bonvoyage.http.controllers.account.host.findHostAccount;

import java.util.UUID;

public record FindHostAccountOutput(
  UUID id,
  String username,
  String email
) {
}
