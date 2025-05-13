package com.mycompany.climate.service.real;

import com.mycompany.climate.model.dto.DtoUpdateRealClimate;
import com.mycompany.climate.model.real.RealParamClimate;
import com.mycompany.climate.repository.real.RealParamClimateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class RealParamClimateService {

    @Autowired
    private RealParamClimateRepository repository;

    public void save(RealParamClimate realParamClimate) {
        repository.save(realParamClimate);
    }

    public void update(RealParamClimate realParamClimate) {
        repository.save(realParamClimate);
    }

    public void updateLast(DtoUpdateRealClimate climate){
        RealParamClimate realParamClimate = repository.findTopByOrderByIdDesc();
        realParamClimate.setCreatedAt(LocalDateTime.now());
        realParamClimate.setHumidityAirReal(Math.round(climate.getHumidityAirReal() * 100) / 100.0);
        realParamClimate.setWaterTankLevelHumidityAirReal(Math.round(climate.getWaterTankLevelHumidityAirReal() * 100) / 100.0);
        realParamClimate.setCarbonDioxideReal(climate.getCarbonDioxideReal());
        realParamClimate.setCarbonDioxideStreetReal(climate.getCarbonDioxideStreetReal());
        realParamClimate.setHumiditySoilRealOne(Math.round(climate.getHumiditySoilRealOne() * 100) / 100.0);
        realParamClimate.setHumiditySoilRealTwo(Math.round(climate.getHumiditySoilRealTwo() * 100) / 100.0);
        realParamClimate.setHumiditySoilRealThree(Math.round(climate.getHumiditySoilRealThree() * 100) / 100.0);
        realParamClimate.setCarbonDioxideTankLevelReal(Math.round(climate.getCarbonDioxideTankLevelReal() * 100) / 100.0);
        realParamClimate.setWaterTankLevelHumiditySoilReal(Math.round(climate.getWaterTankLevelHumiditySoilReal() * 100) / 100.0);
        realParamClimate.setWhiteLightReal(climate.getWhiteLightReal());
        realParamClimate.setTemperatureAirReal(Math.round(climate.getTemperatureAirReal() * 100) / 100.0);
        realParamClimate.setTemperatureSoilRealOne(Math.round(climate.getTemperatureSoilRealOne() * 100) / 100.0);
        realParamClimate.setTemperatureSoilRealTwo(Math.round(climate.getTemperatureSoilRealTwo() * 100) / 100.0);
        realParamClimate.setTemperatureSoilRealThree(Math.round(climate.getTemperatureSoilRealThree() * 100) / 100.0);
        repository.save(realParamClimate);
    }

    public void delete(RealParamClimate realParamClimate) {
        repository.delete(realParamClimate);
    }

    public RealParamClimate getLast(){
        return repository.findTopByOrderByIdDesc();
    }
}
