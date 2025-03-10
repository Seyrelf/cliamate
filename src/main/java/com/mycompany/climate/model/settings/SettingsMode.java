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
    private String modeTempSoil;
    private String modeHumidityAir;
    private String modeHumiditySoil;
    private String modeLight;
    private String modeVentilation;
    private String modeCarbonDioxide;


    @Override
    public String toString() {
        return "SettingsMode{" +
                "id=" + id +
                ", modeTempAir='" + modeTempAir + '\'' +
                ", modeTempSoil='" + modeTempSoil + '\'' +
                ", modeHumidityAir='" + modeHumidityAir + '\'' +
                ", modeHumiditySoil='" + modeHumiditySoil + '\'' +
                ", modeLight='" + modeLight + '\'' +
                ", modeVentilation='" + modeVentilation + '\'' +
                ", modeCarbonDioxide='" + modeCarbonDioxide + '\'' +
                '}';
    }
}
