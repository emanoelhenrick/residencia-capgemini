package com.eden.bonvoyage.core.services.account.host;

import com.eden.bonvoyage.core.exceptions.UserNotFoundException;
import com.eden.bonvoyage.core.models.HostAccount;
import com.eden.bonvoyage.core.repository.HostAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class FindHostAccountService {

  @Autowired
  private HostAccountRepository hostAccountRepository;

  public HostAccount run(String id) {
    return hostAccountRepository
      .findById(UUID.fromString(id))
      .orElseThrow(() -> new UserNotFoundException(id));
  }

}
