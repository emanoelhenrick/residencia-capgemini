package com.eden.bonvoyage.core.models.user;

import com.eden.bonvoyage.core.models.Hotel;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "users")
public class User implements UserDetails {

  @Id
  @EqualsAndHashCode.Include
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @Column(nullable = false)
  private String name;

  @Column(nullable = false, unique = true)
  private String email;

  @Column(nullable = false)
  private String password;

  @Column(nullable = false)
  @Enumerated(EnumType.STRING)
  private UserRole role;

  @OneToMany(mappedBy = "host")
  private List<Hotel> hotels = new ArrayList<>();

  public User(String name, String email, String password, UserRole role) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  @Override
  public String getUsername() {
    return this.email;
  }


  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    if (this.role == UserRole.ADMIN) {
      return List.of(
        new SimpleGrantedAuthority("ROLE_ADMIN"),
        new SimpleGrantedAuthority("ROLE_USER")
      );
    }
    return List.of(new SimpleGrantedAuthority("ROLE_USER"));
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
}
