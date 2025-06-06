package com.mycompany.climate.controller.real;

import com.mycompany.climate.model.dto.DtoUpdateRealDevice;
import com.mycompany.climate.model.real.RealParamDevice;
import com.mycompany.climate.service.real.RealParamDeivceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/realDeviceClimate")
public class RealDeviceClimateController {

    @Autowired
    private RealParamDeivceService service;

    @PostMapping(value = "/create")
    private void create(@RequestBody RealParamDevice realParamDevice) {
        service.save(realParamDevice);
    }

    @PatchMapping(value = "/update")
    private void update(@RequestBody DtoUpdateRealDevice realParamDevice) {
        service.updateLast(realParamDevice);
    }

    @GetMapping(value = "/getLast")
    private RealParamDevice getRealParamDevice() {
        return service.getLast();
    }
}
