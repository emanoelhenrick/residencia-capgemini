package com.eden.bonvoyage.core.services.property;

import com.eden.bonvoyage.core.exceptions.UserNotFoundException;
import com.eden.bonvoyage.core.models.property.NewPropertyDTO;
import com.eden.bonvoyage.core.models.property.Property;
import com.eden.bonvoyage.core.models.user.User;
import com.eden.bonvoyage.core.repository.PropertyRepository;
import com.eden.bonvoyage.core.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddPropertyService {

  @Autowired
  private PropertyRepository propertyRepository;

  @Autowired
  UserRepository userRepository;

  public Property run(NewPropertyDTO data, String hostEmail) {
    var host = userRepository
      .findUserByEmail(hostEmail)
      .orElseThrow(() -> new UserNotFoundException(hostEmail));

    var newProperty = new Property(data);
    newProperty.setHost(host);
    propertyRepository.save(newProperty);
    return newProperty;
  }

}
