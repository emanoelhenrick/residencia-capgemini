package com.eden.bonvoyage.http.controllers.account.customer.AddNewCustomerAccount;

import com.eden.bonvoyage.core.services.account.customer.AddNewCustomerAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user/customer")
public class AddNewCustomerAccountController {

  @Autowired
  private AddNewCustomerAccountService addNewCustomerAccountService;

  @PostMapping
  public ResponseEntity<CustomerAccountIdOutput> AddNewHostAccount(@RequestBody NewCustomerAccountInput input) {
    var newHost = addNewCustomerAccountService.run(input);
    return ResponseEntity
      .status(HttpStatus.CREATED)
      .body(new CustomerAccountIdOutput(newHost.getId()));
  }

}
