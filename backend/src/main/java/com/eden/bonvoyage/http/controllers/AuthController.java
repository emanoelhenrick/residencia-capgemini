package com.eden.bonvoyage.http.controllers;

import com.eden.bonvoyage.core.models.user.AuthDTO;
import com.eden.bonvoyage.core.models.user.LoginResponseDTO;
import com.eden.bonvoyage.core.models.user.RegisterUserDTO;
import com.eden.bonvoyage.core.services.auth.AuthenticateUserService;
import com.eden.bonvoyage.core.services.auth.RegisterUserService;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

  @Autowired
  private AuthenticateUserService authenticateUserService;

  @Autowired
  private RegisterUserService registerUserService;

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody @Valid AuthDTO data) {
    var token = authenticateUserService.run(data);
    return ResponseEntity.ok(new LoginResponseDTO(token));
  }

  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestBody @Valid RegisterUserDTO data) {
    registerUserService.run(data);
    return ResponseEntity.ok().build();
  }

}
