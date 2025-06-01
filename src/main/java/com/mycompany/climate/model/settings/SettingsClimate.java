package com.mycompany.climate.model.settings;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Version;

import java.time.LocalTime;

@Entity
@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SettingsClimate {

    @Id
    private long id;

    @Version
    private double humidityAirLowTask;
    @Version
    private double humidityAirHighTask;

    @Version
    private int carbonDioxideLowTask;
    @Version
    private int carbonDioxideHighTask;


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

    private int whiteLightTask;
    private int whiteLightTaskForCO2;
    private LocalTime startLight;
    private LocalTime endLight;

    private double temperatureAirTask;

    private double temperatureSoilTaskOne;
    private double temperatureSoilTaskTwo;
    private double temperatureSoilTaskThree;

}
