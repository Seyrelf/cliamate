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
    private double humiditySoilLowTaskOne;
    @Version
    private double humiditySoilHighTaskOne;

    @Version
    private double humiditySoilLowTaskTwo;
    @Version
    private double humiditySoilHighTaskTwo;

    @Version
    private double humiditySoilLowTaskThree;
    @Version
    private double humiditySoilHighTaskThree;

    private double whiteLightTask;
    private double temperatureAirTask;

    private double temperatureSoilTaskOne;
    private double temperatureSoilTaskTwo;
    private double temperatureSoilTaskThree;

}
