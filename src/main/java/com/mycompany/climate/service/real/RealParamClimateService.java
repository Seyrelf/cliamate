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
        realParamClimate.setCarbonDioxideReal(Math.round(climate.getCarbonDioxideReal() * 100) / 100.0);
        realParamClimate.setHumiditySoilReal(Math.round(climate.getHumiditySoilReal() * 100) / 100.0);
        realParamClimate.setWaterTankLevelHumiditySoilReal(Math.round(climate.getWaterTankLevelHumiditySoilReal() * 100) / 100.0);
        realParamClimate.setWhiteLightReal(Math.round(climate.getWhiteLightReal() * 100) / 100.0);
        realParamClimate.setRedLightReal(Math.round(climate.getRedLightReal() * 100) / 100.0);
        realParamClimate.setBlueLightReal(Math.round(climate.getBlueLightReal() * 100) / 100.0);
        realParamClimate.setLongLightRedReal(Math.round(climate.getLongLightRedReal() * 100) / 100.0);
        realParamClimate.setUvlightReal(Math.round(climate.getUvlightReal() * 100) / 100.0);
        realParamClimate.setTemperatureAirReal(Math.round(climate.getTemperatureAirReal() * 100) / 100.0);
        realParamClimate.setTemperatureSoilReal(Math.round(climate.getTemperatureSoilReal() * 100) / 100.0);
        repository.save(realParamClimate);
    }

    public void delete(RealParamClimate realParamClimate) {
        repository.delete(realParamClimate);
    }

    public RealParamClimate getLast(){
        return repository.findTopByOrderByIdDesc();
    }
}
