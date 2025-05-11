package com.mycompany.climate.model.settings;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PIDСoefficients {

    @Id
    private long id;
    private String name;
    private double pParam;
    private double iParam;
    private double dParam;

}
