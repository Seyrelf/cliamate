package com.mycompany.climate.service.settings;


import com.mycompany.climate.model.dto.DtoClimateNewTask;
import com.mycompany.climate.model.dto.DtoClimateNewTaskWHL;
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
            case "powerVentilatorInReal":
                break;
            case "whiteLightReal":
                settingsClimate.setWhiteLightTask(task);
                break;

            case "carbonDioxideReal":
                settingsClimate.setCarbonDioxideTask(task);
                break;
        }
        repository.save(settingsClimate);
    }



    public void updateWHL(DtoClimateNewTaskWHL dtoClimateNewTaskWHL) {
        SettingsClimate settingsClimate = repository.findTopByOrderByIdDesc();
        Double taskLow = dtoClimateNewTaskWHL.getParamTaskLow() > 0 ? dtoClimateNewTaskWHL.getParamTaskLow() : 0.0;
        Double taskHigh = dtoClimateNewTaskWHL.getParamTaskHigh() > 0 ? dtoClimateNewTaskWHL.getParamTaskHigh() : 0.0;
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
