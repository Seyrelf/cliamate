package com.mycompany.climate.model.settings;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SettingsDevice {

    @Id
    private long id;

    private double powerTempAirTask;

    private double powerHeatingMatOneTask;
    private double powerHeatingMatTwoTask;
    private double powerHeatingMatThreeTask;

    private double powerVentilatorInTask;
    private double powerFlapOutTask;

    private String workStatusPumpHumiditySoilTaskOne;
    private String workStatusFlapHumiditySoilTaskOne;

    private String workStatusPumpHumiditySoilTaskTwo;
    private String workStatusFlapHumiditySoilTaskTwo;

    private String workStatusPumpHumiditySoilTaskThree;
    private String workStatusFlapHumiditySoilTaskThree;

    private String workStatusVentilatorHumidityAirTask;
    private String workStatusGeneratorHumidityAirTask;

    private String workStatusFlapCO2Task;

    private double whiteLightPowerTask;








}
