package com.mycompany.climate.model.settings;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SettingsMode {

    @Id
    private long id;

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
