package com.mycompany.climate.model.dto;


import lombok.Data;

@Data
public class DtoUpdateRealClimate {

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
