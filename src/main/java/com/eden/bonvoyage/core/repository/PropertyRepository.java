package com.eden.bonvoyage.core.repository;

import com.eden.bonvoyage.core.models.property.Property;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PropertyRepository extends JpaRepository<Property, UUID> {
}
