package com.eden.bonvoyage.http.controllers.account.customer.findCustomerAccount;

import java.util.UUID;

public record FindCustomerAccountOutput(
  UUID id,
  String username,
  String email
) {
}
