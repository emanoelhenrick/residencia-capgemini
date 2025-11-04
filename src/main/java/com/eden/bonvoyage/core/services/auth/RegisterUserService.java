package com.eden.bonvoyage.core.services.auth;

import com.eden.bonvoyage.core.models.user.RegisterUserDTO;
import com.eden.bonvoyage.core.models.user.User;
import com.eden.bonvoyage.core.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RegisterUserService {

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private UserRepository userRepository;

  public void run(RegisterUserDTO data) {
    var isUserAlreadyExists = userRepository.findByEmail(data.email());
    if (isUserAlreadyExists != null) throw new RuntimeException("User already exists");

    var encryptedPassword = passwordEncoder.encode(data.password());
    var newUser = new User(data.name(), data.email(), encryptedPassword, data.role());

    this.userRepository.save(newUser);
  }

}
