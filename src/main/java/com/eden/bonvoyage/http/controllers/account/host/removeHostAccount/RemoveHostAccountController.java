package com.eden.bonvoyage.http.controllers.account.host.removeHostAccount;

import com.eden.bonvoyage.core.services.account.host.RemoveHostAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user/host")
public class RemoveHostAccountController {

  @Autowired
  private RemoveHostAccountService removeHostAccountService;

  @DeleteMapping("/{id}")
  public ResponseEntity<?> removeHostAccount(@PathVariable String id) {
    removeHostAccountService.run(id);
    return ResponseEntity.noContent().build();
  }

}
