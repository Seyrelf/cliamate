package com.mycompany.climate.service.settings;

import com.mycompany.climate.model.settings.SettingsMode;
import com.mycompany.climate.model.dto.DtoParamNameNewMode;

import com.mycompany.climate.repository.settings.SettingsModeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SettingsModeService {

    @Autowired
    private SettingsModeRepository repository;

    public void save(SettingsMode settings) {
        repository.save(settings);
    }

    public void update(DtoParamNameNewMode dtoParamNameNewMode) {
        SettingsMode allMode = repository.findTopByOrderByIdDesc();
        switch (dtoParamNameNewMode.getParamName()){
            case "temperatureAirReal":
                allMode.setModeTempAir(dtoParamNameNewMode.getNewMode());
                System.out.println("!!@!");
                break;
            case "temperatureSoilReal":
                allMode.setModeTempSoil(dtoParamNameNewMode.getNewMode());
                break;
            case "powerVentilatorInReal":
                allMode.setModeVentilation(dtoParamNameNewMode.getNewMode());
                break;
            case "humiditySoilReal":
                allMode.setModeHumiditySoil(dtoParamNameNewMode.getNewMode());
                break;
            case "humidityAirReal":
                allMode.setModeHumidityAir(dtoParamNameNewMode.getNewMode());
                break;
            case "whiteLightReal":
                allMode.setModeLight(dtoParamNameNewMode.getNewMode());
                break;
            case "carbonDioxideReal":
                allMode.setModeCarbonDioxide(dtoParamNameNewMode.getNewMode());
                break;
        }
        repository.save(allMode);
    }

    public void delete(SettingsMode settings) {
        repository.delete(settings);
    }

    public SettingsMode getLast(){
        return repository.findTopByOrderByIdDesc();
    }
}
