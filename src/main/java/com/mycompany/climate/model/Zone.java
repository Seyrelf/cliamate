package com.mycompany.climate.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table
@Data
public class Zone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private double temp;

}
