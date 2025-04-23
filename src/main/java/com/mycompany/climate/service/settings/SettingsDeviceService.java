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
            case "powerTempAirReal":
                settingsDevice.setPowerTempAirTask(Double.parseDouble(task) > 0 ? Double.parseDouble(task): 0);
                break;
            case "powerHeatingMatRealOne":
                settingsDevice.setPowerHeatingMatOneTask(Double.parseDouble(task) > 0 ? Double.parseDouble(task): 0);
                break;
            case "powerHeatingMatRealTwo":
                settingsDevice.setPowerHeatingMatTwoTask(Double.parseDouble(task) > 0 ? Double.parseDouble(task): 0);
                break;
            case "powerHeatingMatRealThree":
                settingsDevice.setPowerHeatingMatThreeTask(Double.parseDouble(task) > 0 ? Double.parseDouble(task): 0);
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
            case "workStatusPumpHumiditySoilRealOne":
                settingsDevice.setWorkStatusPumpHumiditySoilTaskOne(task);
                break;
            case "workStatusFlapHumiditySoilRealOne":
                settingsDevice.setWorkStatusFlapHumiditySoilTaskOne(task);
                break;
            case "workStatusPumpHumiditySoilRealTwo":
                settingsDevice.setWorkStatusPumpHumiditySoilTaskTwo(task);
                break;
            case "workStatusFlapHumiditySoilRealTwo":
                settingsDevice.setWorkStatusFlapHumiditySoilTaskTwo(task);
                break;
            case "workStatusPumpHumiditySoilRealThree":
                settingsDevice.setWorkStatusPumpHumiditySoilTaskThree(task);
                break;
            case "workStatusFlapHumiditySoilRealThree":
                settingsDevice.setWorkStatusFlapHumiditySoilTaskThree(task);
                break;
            case "workStatusVentilatorHumidityAirReal":
                settingsDevice.setWorkStatusVentilatorHumidityAirTask(task);
                break;
            case "workStatusGeneratorHumidityAirReal":
                settingsDevice.setWorkStatusGeneratorHumidityAirTask(task);
                break;
            case "workStatusFlapCO2Real":
                settingsDevice.setWorkStatusFlapCO2Task(task);
                break;
            case "workStatusVentilatorCO2Real":
                settingsDevice.setWorkStatusVentilatorCO2Task(task);
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
