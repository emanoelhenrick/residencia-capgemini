package com.eden.bonvoyage.http.controllers.account.customer.AddNewCustomerAccount;

public record NewCustomerAccountInput(
  String username,
  String password,
  String email,
  String name
) {}
