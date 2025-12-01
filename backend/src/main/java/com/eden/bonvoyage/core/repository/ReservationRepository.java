package com.eden.bonvoyage.core.repository;

import com.eden.bonvoyage.core.models.reservation.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
}
