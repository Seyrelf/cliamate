package com.mycompany.climate.model.dto;

import lombok.Data;

@Data
public class SettingsModeForController {
    private String modeTempAir;
    private String modeTempSoilOne;
    private String modeTempSoilTwo;
    private String modeTempSoilThree;
    private String modeHumidityAir;
    private String modeHumiditySoilOne;
    private String modeHumiditySoilTwo;
    private String modeHumiditySoilThree;
    private String modeLight;
    private String modeVentilation;
    private String modeCarbonDioxide;
}
