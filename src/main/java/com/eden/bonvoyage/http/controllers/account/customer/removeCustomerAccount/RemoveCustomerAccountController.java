package com.eden.bonvoyage.http.controllers.account.customer.removeCustomerAccount;

import com.eden.bonvoyage.core.services.account.customer.RemoveCustomerAccountService;
import com.eden.bonvoyage.core.services.account.host.RemoveHostAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user/customer")
public class RemoveCustomerAccountController {

  @Autowired
  private RemoveCustomerAccountService removeCustomerAccountService;

  @DeleteMapping("/{id}")
  public ResponseEntity<?> removeCustomerAccount(@PathVariable String id) {
    removeCustomerAccountService.run(id);
    return ResponseEntity.noContent().build();
  }

}
