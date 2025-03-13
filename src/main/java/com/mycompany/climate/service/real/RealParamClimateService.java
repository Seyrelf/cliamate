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
        realParamClimate.setHumidityAirReal(climate.getHumidityAirReal());
        realParamClimate.setWaterTankLevelHumidityAirReal(climate.getWaterTankLevelHumidityAirReal());
        realParamClimate.setCarbonDioxideReal(climate.getCarbonDioxideReal());
        realParamClimate.setHumiditySoilReal(climate.getHumiditySoilReal());
        realParamClimate.setWaterTankLevelHumiditySoilReal(climate.getWaterTankLevelHumiditySoilReal());
        realParamClimate.setWhiteLightReal(climate.getWhiteLightReal());
        realParamClimate.setRedLightReal(climate.getRedLightReal());
        realParamClimate.setBlueLightReal(climate.getBlueLightReal());
        realParamClimate.setLongLightRedReal(climate.getLongLightRedReal());
        realParamClimate.setUvlightReal(climate.getUvlightReal());
        realParamClimate.setTemperatureAirReal(climate.getTemperatureAirReal());
        realParamClimate.setTemperatureSoilReal(climate.getTemperatureSoilReal());
        repository.save(realParamClimate);
    }

    public void delete(RealParamClimate realParamClimate) {
        repository.delete(realParamClimate);
    }

    public RealParamClimate getLast(){
        return repository.findTopByOrderByIdDesc();
    }
}
