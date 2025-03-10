package com.mycompany.climate.model.settings;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table
@Data
public class SettingsClimate {

    @Id
    private long id;

    private double humidityAirTask;
    private double carbonDioxideTask;
    private double humiditySoilTask;

    private double whiteLightTask;
    private double redLightTask;
    private double blueLightTask;
    private double longLightRedTask;
    private double uvlightTask;
    private double temperatureAirTask;
    private double temperatureSoilTask;
}
