package com.mycompany.climate.service.settings;


import com.mycompany.climate.model.dto.DtoClimateNewTask;
import com.mycompany.climate.model.dto.DtoParamNameNewMode;
import com.mycompany.climate.model.settings.SettingsClimate;
import com.mycompany.climate.model.settings.SettingsMode;
import com.mycompany.climate.repository.settings.SettingsClimateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SettingsClimateService {

    @Autowired
    private SettingsClimateRepository repository;

    public void save(SettingsClimate settings) {
        repository.save(settings);
    }

    public void update(DtoClimateNewTask dtoClimateNewTask) {
        SettingsClimate settingsClimate = repository.findTopByOrderByIdDesc();
        Double task = dtoClimateNewTask.getParamTask() > 0 ? dtoClimateNewTask.getParamTask() : 0.0;
        switch (dtoClimateNewTask.getParamName()){
            case "temperatureAirReal":
                settingsClimate.setTemperatureAirTask(task);
                break;
            case "temperatureSoilReal":
                settingsClimate.setTemperatureSoilTask(task);
                break;
            case "powerVentilatorInReal":
                break;
            case "humiditySoilReal":
                settingsClimate.setHumiditySoilTask(task);
                break;
            case "humidityAirReal":
                settingsClimate.setHumidityAirTask(task);
                break;
            case "whiteLightReal":
                settingsClimate.setWhiteLightTask(task);
                break;
            case "uvlightReal":
                settingsClimate.setUvlightTask(task);
                break;
            case "redLightReal":
                settingsClimate.setRedLightTask(task);
                break;
            case "blueLightReal":
                settingsClimate.setBlueLightTask(task);
                break;
            case "longLightRedReal":
                settingsClimate.setLongLightRedTask(task);
                break;
            case "carbonDioxideReal":
                settingsClimate.setCarbonDioxideTask(task);
                break;
        }
        repository.save(settingsClimate);
    }

    public void delete(SettingsClimate settings) {
        repository.delete(settings);
    }

    public SettingsClimate getLast(){
        return repository.findTopByOrderByIdDesc();
    }
}
