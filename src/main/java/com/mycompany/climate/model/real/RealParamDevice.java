package com.mycompany.climate.model.real;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RealParamDevice {

    @Id
    private long id;

    private double powerTempAirReal;

    private double powerHeatingMatRealOne;
    private double powerHeatingMatRealTwo;
    private double powerHeatingMatRealThree;

    private double powerVentilatorInReal;
    private double powerFlapOutReal;

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


}
