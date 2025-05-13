package com.mycompany.climate.model;

import lombok.Data;

@Data
public class UserWithOutPassword {

    private long id;
    private String username;
    private String role;
}
