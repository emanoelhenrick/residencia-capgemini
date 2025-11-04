package com.eden.bonvoyage.core.repository;

import com.eden.bonvoyage.core.models.HostAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface HostAccountRepository extends JpaRepository<HostAccount, UUID> {

}
