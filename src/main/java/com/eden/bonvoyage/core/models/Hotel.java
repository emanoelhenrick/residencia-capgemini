package com.eden.bonvoyage.core.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "hotel")
public class Hotel {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  private String name;
  private String description;

  private String address;

  private String phone;
  private String email;

  private double avaliacaoMedia;

  private boolean isEnable;

  @OneToMany(mappedBy = "hotel", fetch = FetchType.LAZY)
  private List<Room> rooms;

  @ManyToOne(fetch = FetchType.LAZY)
  private HostAccount hostAccount;

}
