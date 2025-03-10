package com.mycompany.climate.model.settings;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table
@Data
public class SettingsDevice {

    @Id
    private long id;

    private double flapHotWaterTask;
    private double flapColdWaterTask;

    private double powerHeatingMatTask;

    private double powerVentilatorInTask;
    private double powerVentilatorOutRealTask;

    private String workStatusPumpHumiditySoilTask;
    private String workStatusFlapHumiditySoilTask;

    private String workStatusVentilatorHumidityAirTask;
    private String workStatusGeneratorHumidityAirTask;

    private double whiteLightPowerTask;
    private double redLightPowerTask;
    private double blueLightPowerTask;
    private double longLightRedPowerTask;
    private double uvlightPowerTask;







}
