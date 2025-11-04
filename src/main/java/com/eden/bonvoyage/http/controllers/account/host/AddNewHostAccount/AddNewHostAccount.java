package com.eden.bonvoyage.http.controllers.account.host.AddNewHostAccount;

import com.eden.bonvoyage.core.services.account.host.AddNewHostAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user/host")
public class AddNewHostAccount {

  @Autowired
  private AddNewHostAccountService addNewHostAccountService;

  @PostMapping
  public ResponseEntity<HostAccountIdOutput> AddNewHostAccount(
    @RequestBody NewHostAccountInput input
  ) {
    var newHost = addNewHostAccountService.run(input);
    return ResponseEntity
      .status(HttpStatus.CREATED)
      .body(new HostAccountIdOutput(newHost.getId()));
  }

}
