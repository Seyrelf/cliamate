package com.mycompany.climate.model.real;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Table
@Data
public class RealParamDevice {

    @Id
    private long id;

    private double flapHotWaterReal;

    private double powerHeatingMatReal;

    private double powerVentilatorInReal;
    private double powerVentilatorOutReal;

    private String workStatusPumpHumiditySoilReal;
    private String workStatusFlapHumiditySoilReal;

    private String workStatusVentilatorHumidityAirReal;
    private String workStatusGeneratorHumidityAirReal;

    private double whiteLightPowerReal;
    private double redLightPowerReal;
    private double blueLightPowerReal;
    private double longLightRedPowerReal;
    private double uvlightPowerReal;

}
