package com.eden.bonvoyage.core.services.account.host;

import com.eden.bonvoyage.core.models.HostAccount;
import com.eden.bonvoyage.core.repository.HostAccountRepository;
import com.eden.bonvoyage.http.controllers.account.host.AddNewHostAccount.NewHostAccountInput;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AddNewHostAccountService {

  @Autowired
  private HostAccountRepository hostAccountRepository;

  @Transactional
  public HostAccount run(NewHostAccountInput input) {
    var newHostUser = new HostAccount(input);
    hostAccountRepository.save(newHostUser);
    return newHostUser;
  }

}
