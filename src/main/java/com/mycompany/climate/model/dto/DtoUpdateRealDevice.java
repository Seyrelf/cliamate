package com.mycompany.climate.model.dto;

import lombok.Data;

@Data
public class DtoUpdateRealDevice {


    private double powerTempAirReal;

    private double powerHeatingMatRealOne;
    private double powerHeatingMatRealTwo;
    private double powerHeatingMatRealThree;

    private double powerVentilatorInReal;
    private double powerVentilatorOutReal;

    private String workStatusPumpHumiditySoilRealOne;
    private String workStatusPumpHumiditySoilRealTwo;
    private String workStatusPumpHumiditySoilRealThree;

    private String workStatusFlapHumiditySoilRealOne;
    private String workStatusFlapHumiditySoilRealTwo;
    private String workStatusFlapHumiditySoilRealThree;

    private String workStatusVentilatorHumidityAirReal;
    private String workStatusGeneratorHumidityAirReal;

    private double whiteLightPowerReal;

    private String workStatusFlapCO2Real;
    private String workStatusVentilatorCO2Real;


}
