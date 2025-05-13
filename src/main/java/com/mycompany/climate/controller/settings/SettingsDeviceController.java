package com.mycompany.climate.controller.settings;

import com.mycompany.climate.model.dto.DtoDeviceNewTextTask;
import com.mycompany.climate.model.settings.SettingsDevice;
import com.mycompany.climate.service.settings.SettingsDeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/settingsDevice")
public class SettingsDeviceController {

    @Autowired
    private SettingsDeviceService service;

    @PostMapping(value = "/create")
    private void create(@RequestBody SettingsDevice settingsDevice) {
        service.save(settingsDevice);
    }

    @GetMapping(value = "/getLast")
    private SettingsDevice getSettingsDevice() {
        return service.getLast();
    }

    @PatchMapping(value = "/update")
    private boolean update(@RequestBody DtoDeviceNewTextTask dtoDeviceNewTextTask) {
        service.update(dtoDeviceNewTextTask);
        return true;
    }
}
