package com.eden.bonvoyage.http.controllers.account.host.AddNewHostAccount;

public record NewHostAccountInput(
  String username,
  String password,
  String email,
  String name
) {}
