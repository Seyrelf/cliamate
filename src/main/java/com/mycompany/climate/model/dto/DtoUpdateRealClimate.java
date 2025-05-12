package com.mycompany.climate.model.dto;


import lombok.Data;

@Data
public class DtoUpdateRealClimate {


    private double humidityAirReal;
    private double humidityAirStreetReal;
    private double waterTankLevelHumidityAirReal;
    private int carbonDioxideReal;
    private double carbonDioxideTankLevelReal;
    private double waterTankLevelHumiditySoilReal;

    private int whiteLightReal;
    private double temperatureAirReal;
    private double temperatureAirStreetReal;

    private double temperatureSoilRealOne;
    private double temperatureSoilRealTwo;
    private double temperatureSoilRealThree;

    private double humiditySoilRealOne;
    private double humiditySoilRealTwo;
    private double humiditySoilRealThree;
}
