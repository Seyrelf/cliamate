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
        realParamDevice.setPowerTempAirReal(device.getPowerTempAirReal());
        realParamDevice.setPowerHeatingMatRealOne(device.getPowerHeatingMatRealOne());
        realParamDevice.setPowerHeatingMatRealTwo(device.getPowerHeatingMatRealTwo());
        realParamDevice.setPowerHeatingMatRealThree(device.getPowerHeatingMatRealThree());
        realParamDevice.setPowerVentilatorInReal(device.getPowerVentilatorInReal());
        realParamDevice.setPowerFlapOutReal(device.getPowerVentilatorOutReal());
        realParamDevice.setWorkStatusFlapHumiditySoilRealOne(device.getWorkStatusFlapHumiditySoilRealOne());
        realParamDevice.setWorkStatusPumpHumiditySoilRealOne(device.getWorkStatusPumpHumiditySoilRealOne());
        realParamDevice.setWorkStatusFlapHumiditySoilRealTwo(device.getWorkStatusFlapHumiditySoilRealTwo());
        realParamDevice.setWorkStatusPumpHumiditySoilRealTwo(device.getWorkStatusPumpHumiditySoilRealTwo());
        realParamDevice.setWorkStatusFlapHumiditySoilRealThree(device.getWorkStatusFlapHumiditySoilRealThree());
        realParamDevice.setWorkStatusPumpHumiditySoilRealThree(device.getWorkStatusPumpHumiditySoilRealThree());
        realParamDevice.setWorkStatusGeneratorHumidityAirReal(device.getWorkStatusGeneratorHumidityAirReal());
        realParamDevice.setWorkStatusVentilatorHumidityAirReal(device.getWorkStatusVentilatorHumidityAirReal());
        realParamDevice.setWhiteLightPowerReal(device.getWhiteLightPowerReal());
        realParamDevice.setWorkStatusFlapCO2Real(device.getWorkStatusFlapCO2Real());
        repository.save(realParamDevice);
    }
    public  void delete(RealParamDevice device) {
        repository.delete(device);
    }

    public RealParamDevice getLast(){
        return repository.findTopByOrderByIdDesc();
    }
}
