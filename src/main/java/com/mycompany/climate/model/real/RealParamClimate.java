package com.mycompany.climate.model.real;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RealParamClimate {

    @Id
    private long id;

    @CreationTimestamp
    private LocalDateTime createdAt;

    private double humidityAirReal;
    private double humidityAirStreetReal;
    private double waterTankLevelHumidityAirReal;
    private double waterTankLevelHumiditySoilReal;
    private int carbonDioxideReal;
    private int carbonDioxideStreetReal;
    private double carbonDioxideTankLevelReal;
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
