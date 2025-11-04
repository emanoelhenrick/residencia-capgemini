package com.eden.bonvoyage.core.models;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "room")
public class Room {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  private String number;
  private int capacity;
  private double pricePerNight;
  private boolean isAvailable;
  private String description;

  @ManyToOne
  @JoinColumn(nullable = false)
  private Hotel hotel;

}
