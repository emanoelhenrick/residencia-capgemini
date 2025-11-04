package com.eden.bonvoyage.core.services.account.customer;

import com.eden.bonvoyage.core.repository.CustomerAccountRepository;
import com.eden.bonvoyage.core.repository.HostAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class RemoveCustomerAccountService {

  @Autowired
  private CustomerAccountRepository customerAccountRepository;

  @Transactional
  public void run(String id) {
    customerAccountRepository.deleteById(UUID.fromString(id));
  }

}
