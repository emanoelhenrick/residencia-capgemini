package com.eden.bonvoyage.core.services.account.host;

import com.eden.bonvoyage.core.repository.HostAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class RemoveHostAccountService {

  @Autowired
  private HostAccountRepository hostAccountRepository;

  @Transactional
  public void run(String id) {
    hostAccountRepository.deleteById(UUID.fromString(id));
  }

}
