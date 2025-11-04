package com.eden.bonvoyage.infra;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.eden.bonvoyage.core.models.user.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

  @Value("${api.security.token.secret}")
  private String secret;

  public String generateToken(User user) {
    try {
      var algorithm = Algorithm.HMAC256(secret);
      return JWT.create()
        .withIssuer("bonvoyage-api")
        .withSubject(user.getEmail())
        .withExpiresAt(this.genExpirationDate())
        .sign(algorithm);
    } catch (JWTCreationException exception) {
      throw new RuntimeException("Error generating JWT token", exception);
    }
  }

  public String validateToken(String token) {
    try {
      var algorithm = Algorithm.HMAC256(secret);
      return JWT
        .require(algorithm)
        .withIssuer("bonvoyage-api")
        .build()
        .verify(token)
        .getSubject();
    } catch (JWTVerificationException exception) {
      return "";
    }
  }

  private Instant genExpirationDate() {
    return LocalDateTime.now().plusDays(30).toInstant(ZoneOffset.of("-03:00"));
  }

}
