package com.mycompany.climate.service.settings;

import com.mycompany.climate.model.dto.DtoDeviceNewTextTask;
import com.mycompany.climate.model.settings.SettingsDevice;
import com.mycompany.climate.repository.settings.SettingsDeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SettingsDeviceService {

    @Autowired
    private SettingsDeviceRepository repository;

    public void save(SettingsDevice settings) {
        repository.save(settings);
    }

    public void update(DtoDeviceNewTextTask dto) {
        SettingsDevice settingsDevice = repository.findTopByOrderByIdDesc();
        String task = dto.getParamTask();
        switch (dto.getParamName()){
            case "flapHotWaterReal":
                settingsDevice.setFlapHotWaterTask(Double.parseDouble(task) > 0 ? Double.parseDouble(task): 0);
                break;
            case "flapColdWaterReal":
                settingsDevice.setFlapColdWaterTask(Double.parseDouble(task) > 0 ? Double.parseDouble(task): 0);
                break;
            case "powerHeatingMatReal":
                settingsDevice.setPowerHeatingMatTask(Double.parseDouble(task) > 0 ? Double.parseDouble(task): 0);
                break;
            case "powerVentilatorInReal":
                settingsDevice.setPowerVentilatorInTask(Double.parseDouble(task) > 0 ? Double.parseDouble(task): 0);
                break;
            case "powerVentilatorOutReal":
                settingsDevice.setPowerVentilatorOutRealTask(Double.parseDouble(task) > 0 ? Double.parseDouble(task): 0);
                break;
            case "whiteLightPowerReal":
                settingsDevice.setWhiteLightPowerTask(Double.parseDouble(task) > 0 ? Double.parseDouble(task): 0);
                break;
            case "redLightPowerReal":
                settingsDevice.setRedLightPowerTask(Double.parseDouble(task) > 0 ? Double.parseDouble(task): 0);
                break;
            case "blueLightPowerReal":
                settingsDevice.setBlueLightPowerTask(Double.parseDouble(task) > 0 ? Double.parseDouble(task): 0);
                break;
            case "longLightRedPowerReal":
                settingsDevice.setLongLightRedPowerTask(Double.parseDouble(task) > 0 ? Double.parseDouble(task): 0);
                break;
            case "uvlightPowerReal":
                settingsDevice.setUvlightPowerTask(Double.parseDouble(task) > 0 ? Double.parseDouble(task): 0);
                break;
            case "workStatusPumpHumiditySoilReal":
                settingsDevice.setWorkStatusPumpHumiditySoilTask(task);
                break;
            case "workStatusFlapHumiditySoilReal":
                settingsDevice.setWorkStatusFlapHumiditySoilTask(task);
                break;
            case "workStatusVentilatorHumidityAirReal":
                settingsDevice.setWorkStatusVentilatorHumidityAirTask(task);
                break;
            case "workStatusGeneratorHumidityAirReal":
                settingsDevice.setWorkStatusGeneratorHumidityAirTask(task);
                break;
        }
        repository.save(settingsDevice);
    }

    public void delete(SettingsDevice settings) {
        repository.delete(settings);
    }

    public SettingsDevice getLast(){
        return repository.findTopByOrderByIdDesc();
    }
}
