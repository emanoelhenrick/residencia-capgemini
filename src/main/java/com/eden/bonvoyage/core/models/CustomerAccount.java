package com.eden.bonvoyage.core.models;

import com.eden.bonvoyage.http.controllers.account.customer.AddNewCustomerAccount.NewCustomerAccountInput;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "customer_user")
public class CustomerAccount {

  @Id
  @EqualsAndHashCode.Include
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @Column(nullable = false)
  private String name;

  @Column(nullable = false, unique = true)
  private String username;

  @Column(nullable = false)
  private String password;

  @Column(nullable = false)
  private String email;

  @Column(nullable = false)
  @Enumerated(EnumType.STRING)
  private AccountRole role;

  public CustomerAccount(NewCustomerAccountInput input) {
    this.username = input.username();
    this.password = input.password();
    this.email = input.email();
    this.name = input.name();
    this.role = AccountRole.CUSTOMER;
  }

}
