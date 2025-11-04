package com.eden.bonvoyage.http.controllers.account.host.findHostAccount;

import com.eden.bonvoyage.core.services.account.host.FindHostAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user/host")
public class FindHostAccountController {

  @Autowired
  private FindHostAccountService FindHostAccountService;

  @GetMapping("/{id}")
  ResponseEntity<FindHostAccountOutput> findHostAccount(@PathVariable String id) {
    var hostUser = FindHostAccountService.run(id);
    return ResponseEntity.ok(new FindHostAccountOutput(
      hostUser.getId(), hostUser.getUsername(), hostUser.getEmail()
    ));
  }

}
