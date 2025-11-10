package com.eden.bonvoyage.core.services.auth;

import com.eden.bonvoyage.core.models.user.AuthDTO;
import com.eden.bonvoyage.core.models.user.User;
import com.eden.bonvoyage.infra.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class AuthenticateUserService {

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private TokenService tokenService;

  public String run(AuthDTO data) {
    var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
    var auth = this.authenticationManager.authenticate(usernamePassword);
    return tokenService.generateToken((User) auth.getPrincipal());
  }

}
