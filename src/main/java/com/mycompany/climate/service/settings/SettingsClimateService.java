package com.mycompany.climate.service.settings;


import com.mycompany.climate.model.dto.*;
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
        double task = dtoClimateNewTask.getParamTask() > 0 ? dtoClimateNewTask.getParamTask() : 0.0;
        System.out.println(dtoClimateNewTask.getParamName() + " ||| " + dtoClimateNewTask.getParamTask());
        switch (dtoClimateNewTask.getParamName()){
            case "temperatureAirReal":
                settingsClimate.setTemperatureAirTask(task);
                break;
            case "temperatureSoilRealOne":
                settingsClimate.setTemperatureSoilTaskOne(task);
                break;
            case "temperatureSoilRealTwo":
                settingsClimate.setTemperatureSoilTaskTwo(task);
                break;
            case "temperatureSoilRealThree":
                settingsClimate.setTemperatureSoilTaskThree(task);
                break;
        }
        repository.save(settingsClimate);
    }

    public void updateTaskForLight(DtoClimateNewTaskForLight dtoClimateNewTask) {
        SettingsClimate settingsClimate = repository.findTopByOrderByIdDesc();
        settingsClimate.setWhiteLightTask(dtoClimateNewTask.getParamTask());
        settingsClimate.setStartLight(dtoClimateNewTask.getStartLight());
        settingsClimate.setEndLight(dtoClimateNewTask.getEndLight());
        repository.save(settingsClimate);
    }

    public void updateTaskForCO2(DtoClimateNewTaskForCO2 dtoClimateNewTask) {
        SettingsClimate settingsClimate = repository.findTopByOrderByIdDesc();
        settingsClimate.setWhiteLightTaskForCO2(dtoClimateNewTask.getMinLightTask());
        settingsClimate.setCarbonDioxideLowTask(dtoClimateNewTask.getParamTaskLow());
        settingsClimate.setCarbonDioxideHighTask(dtoClimateNewTask.getParamTaskHigh());
        repository.save(settingsClimate);
    }



    public void updateWHL(DtoClimateNewTaskWHL dtoClimateNewTaskWHL) {
        SettingsClimate settingsClimate = repository.findTopByOrderByIdDesc();
        double taskLow = dtoClimateNewTaskWHL.getParamTaskLow() > 0 ? dtoClimateNewTaskWHL.getParamTaskLow() : 0.0;
        double taskHigh = dtoClimateNewTaskWHL.getParamTaskHigh() > 0 ? dtoClimateNewTaskWHL.getParamTaskHigh() : 0.0;
        switch (dtoClimateNewTaskWHL.getParamName()){
            case "humiditySoilRealOne":
                settingsClimate.setHumiditySoilLowTaskOne(taskLow);
                settingsClimate.setHumiditySoilHighTaskOne(taskHigh);
                break;
            case "humiditySoilRealTwo":
                settingsClimate.setHumiditySoilLowTaskTwo(taskLow);
                settingsClimate.setHumiditySoilHighTaskTwo(taskHigh);
                break;
            case "humiditySoilRealThree":
                settingsClimate.setHumiditySoilLowTaskThree(taskLow);
                settingsClimate.setHumiditySoilHighTaskThree(taskHigh);
                break;
            case "humidityAirReal":
                settingsClimate.setHumidityAirLowTask(taskLow);
                settingsClimate.setHumidityAirHighTask(taskHigh);
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
