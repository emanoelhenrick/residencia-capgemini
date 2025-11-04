package com.eden.bonvoyage.core.services.account.customer;

import com.eden.bonvoyage.core.exceptions.UserNotFoundException;
import com.eden.bonvoyage.core.models.CustomerAccount;
import com.eden.bonvoyage.core.models.HostAccount;
import com.eden.bonvoyage.core.repository.CustomerAccountRepository;
import com.eden.bonvoyage.core.repository.HostAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class FindCustomerAccountService {

  @Autowired
  private CustomerAccountRepository customerAccountRepository;

  public CustomerAccount run(String id) {
    return customerAccountRepository
      .findById(UUID.fromString(id))
      .orElseThrow(() -> new UserNotFoundException(id));
  }

}
