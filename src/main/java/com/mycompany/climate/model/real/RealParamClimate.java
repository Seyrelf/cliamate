package com.mycompany.climate.model.real;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table
@Data
public class RealParamClimate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @CreationTimestamp
    private LocalDateTime createdAt;

    private double humidityAirReal;
    private double humidityAirStreetReal;
    private double waterTankLevelHumidityAirReal;
    private double waterTankLevelHumiditySoilReal;
    private double carbonDioxideReal;
    private double carbonDioxideTankLevelReal;
    private double whiteLightReal;

    private double temperatureAirReal;
    private double temperatureAirStreetReal;

    private double temperatureSoilRealOne;
    private double temperatureSoilRealTwo;
    private double temperatureSoilRealThree;

    private double humiditySoilRealOne;
    private double humiditySoilRealTwo;
    private double humiditySoilRealThree;


}
