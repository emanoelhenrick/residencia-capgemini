package com.eden.bonvoyage.http.controllers.account.customer.findCustomerAccount;

import com.eden.bonvoyage.core.services.account.customer.FindCustomerAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user/customer")
public class FindCustomerAccountController {

  @Autowired
  private FindCustomerAccountService findCustomerAccountService;

  @GetMapping("/{id}")
  ResponseEntity<FindCustomerAccountOutput> findCustomerAccount(@PathVariable String id) {
    var customerAccount = findCustomerAccountService.run(id);
    return ResponseEntity.ok(new FindCustomerAccountOutput(
      customerAccount.getId(), customerAccount.getUsername(), customerAccount.getEmail()
    ));
  }

}
