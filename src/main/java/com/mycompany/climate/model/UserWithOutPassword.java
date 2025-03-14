package com.mycompany.climate.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
public class UserWithOutPassword {

    private long id;
    private String username;
    private String role;
}
