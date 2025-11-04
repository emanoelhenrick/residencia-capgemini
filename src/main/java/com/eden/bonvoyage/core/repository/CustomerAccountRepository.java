package com.eden.bonvoyage.core.repository;

import com.eden.bonvoyage.core.models.CustomerAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CustomerAccountRepository extends JpaRepository<CustomerAccount, UUID> {

}
