package com.mycompany.climate.controller.settings;

import com.fasterxml.jackson.databind.node.ObjectNode;
import com.mycompany.climate.model.dto.DtoPID;
import com.mycompany.climate.model.settings.SettingsMode;
import com.mycompany.climate.model.dto.DtoParamNameNewMode;
import com.mycompany.climate.service.settings.SettingsModeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mode")
public class SettingsModeController {

    @Autowired
    private SettingsModeService service;

    @PostMapping(value = "/create")
    private void create(@RequestBody SettingsMode settingsMode) {
        service.save(settingsMode);
    }

    @GetMapping(value = "/getLast")
    private List<SettingsMode> getSettingsMode() {
        return service.getLast();
    }

    @GetMapping(value = "/getModeByName")
    private SettingsMode getModeByName(@RequestParam String name ) {
        return service.getByName(name);
    }

    @PatchMapping(value = "/update")
    private void update(@RequestBody DtoParamNameNewMode dtoParamNameNewMode) {
        service.update(dtoParamNameNewMode);
    }

    @GetMapping(value = "/getModeForController")
    private ObjectNode getAllPidForController() {
        return service.sendAllModeToController();
    }
}
