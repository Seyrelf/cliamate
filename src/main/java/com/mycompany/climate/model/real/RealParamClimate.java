package com.mycompany.climate.model.real;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table
@Data
public class RealParamClimate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @CreationTimestamp
    private LocalDateTime createdAt;

    private double humidityAirReal;
    private double waterTankLevelHumidityAirReal;
    private double carbonDioxideReal;
    private double humiditySoilReal;
    private double waterTankLevelHumiditySoilReal;

    private double whiteLightReal;
    private double redLightReal;
    private double blueLightReal;
    private double longLightRedReal;
    private double uvlightReal;
    private double temperatureAirReal;
    private double temperatureSoilReal;


}
