package com.mycompany.climate.controller.settings;

import com.mycompany.climate.model.dto.DtoClimateNewTask;
import com.mycompany.climate.model.real.RealParamDevice;
import com.mycompany.climate.model.settings.SettingsClimate;
import com.mycompany.climate.model.settings.SettingsDevice;
import com.mycompany.climate.service.settings.SettingsClimateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/settingsClimate")
public class SettingsClimateController {

    @Autowired
    private SettingsClimateService service;


    @PostMapping(value = "/create")
    private void create(@RequestBody SettingsClimate settingsClimate) {
        service.save(settingsClimate);
    }

    @GetMapping(value = "/getLast")
    private SettingsClimate getSettingsClimate() {
        return service.getLast();
    }

    @PatchMapping(value = "/update")
    private void update(@RequestBody DtoClimateNewTask dtoClimateNewTask) {
        service.update(dtoClimateNewTask);
    }
}
