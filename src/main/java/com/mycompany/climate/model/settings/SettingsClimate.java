package com.mycompany.climate.model.settings;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import org.springframework.data.annotation.Version;

@Entity
@Table
@Data
public class SettingsClimate {

    @Id
    private long id;

    @Version
    private double humidityAirLowTask;
    @Version
    private double humidityAirHighTask;
    private double carbonDioxideTask;
    @Version
    private double humiditySoilLowTask;
    @Version
    private double humiditySoilHighTask;

    private double whiteLightTask;
    private double redLightTask;
    private double blueLightTask;
    private double longLightRedTask;
    private double uvlightTask;
    private double temperatureAirTask;
    private double temperatureSoilTask;
}
