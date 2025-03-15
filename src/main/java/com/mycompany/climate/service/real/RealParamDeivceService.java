package com.mycompany.climate.service.real;


import com.mycompany.climate.model.dto.DtoUpdateRealDevice;
import com.mycompany.climate.model.real.RealParamDevice;
import com.mycompany.climate.repository.real.RealParamDeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RealParamDeivceService {

    @Autowired
    private RealParamDeviceRepository repository;

    public void save(RealParamDevice device) {
        repository.save(device);
    }

    public void updateLast(DtoUpdateRealDevice device) {
        RealParamDevice realParamDevice= repository.findTopByOrderByIdDesc();
        realParamDevice.setFlapHotWaterReal(device.getFlapHotWaterReal());
        realParamDevice.setPowerHeatingMatReal(device.getPowerHeatingMatReal());
        realParamDevice.setPowerVentilatorInReal(device.getPowerVentilatorInReal());
        realParamDevice.setPowerVentilatorOutReal(device.getPowerVentilatorOutReal());
        realParamDevice.setWorkStatusFlapHumiditySoilReal(device.getWorkStatusFlapHumiditySoilReal());
        realParamDevice.setWorkStatusPumpHumiditySoilReal(device.getWorkStatusPumpHumiditySoilReal());
        realParamDevice.setWorkStatusGeneratorHumidityAirReal(device.getWorkStatusGeneratorHumidityAirReal());
        realParamDevice.setWorkStatusVentilatorHumidityAirReal(device.getWorkStatusVentilatorHumidityAirReal());
        realParamDevice.setWhiteLightPowerReal(device.getWhiteLightPowerReal());
        realParamDevice.setBlueLightPowerReal(device.getBlueLightPowerReal());
        realParamDevice.setUvlightPowerReal(device.getUvlightPowerReal());
        realParamDevice.setLongLightRedPowerReal(device.getLongLightRedPowerReal());
        realParamDevice.setRedLightPowerReal(device.getRedLightPowerReal());
        repository.save(realParamDevice);
    }
    public  void delete(RealParamDevice device) {
        repository.delete(device);
    }

    public RealParamDevice getLast(){
        return repository.findTopByOrderByIdDesc();
    }
}
