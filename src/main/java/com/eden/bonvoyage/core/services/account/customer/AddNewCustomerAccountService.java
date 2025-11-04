package com.eden.bonvoyage.core.services.account.customer;

import com.eden.bonvoyage.core.models.CustomerAccount;
import com.eden.bonvoyage.core.models.HostAccount;
import com.eden.bonvoyage.core.repository.CustomerAccountRepository;
import com.eden.bonvoyage.core.repository.HostAccountRepository;
import com.eden.bonvoyage.http.controllers.account.customer.AddNewCustomerAccount.NewCustomerAccountInput;
import com.eden.bonvoyage.http.controllers.account.host.AddNewHostAccount.NewHostAccountInput;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AddNewCustomerAccountService {

  @Autowired
  private CustomerAccountRepository customerAccountRepository;

  @Transactional
  public CustomerAccount run(NewCustomerAccountInput input) {
    var newCustomerAccount = new CustomerAccount(input);
    customerAccountRepository.save(newCustomerAccount);
    return newCustomerAccount;
  }

}
