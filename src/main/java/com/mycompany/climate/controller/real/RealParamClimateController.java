package com.mycompany.climate.controller.real;

import com.mycompany.climate.model.dto.DtoUpdateRealClimate;
import com.mycompany.climate.model.real.RealParamClimate;
import com.mycompany.climate.model.real.RealParamDevice;
import com.mycompany.climate.model.settings.SettingsClimate;
import com.mycompany.climate.service.real.RealParamClimateService;
import com.mycompany.climate.service.real.RealParamDeivceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/realParamClimate")
public class RealParamClimateController {

    @Autowired
    private RealParamClimateService service;

    @PostMapping(value = "/create")
    private void create(@RequestBody RealParamClimate realParamClimate) {
        service.save(realParamClimate);
    }

    @PatchMapping(value = "/update")
    private void update(@RequestBody DtoUpdateRealClimate realParamClimate) {
        service.updateLast(realParamClimate);
    }

    @GetMapping(value = "/getLast")
    private RealParamClimate getRealParamClimate() {
        return service.getLast();
    }


}
