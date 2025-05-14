package com.mycompany.climate.controller.settings;

import com.mycompany.climate.model.dto.DtoPID;
import com.mycompany.climate.model.settings.SettingsPIDСoefficients;
import com.mycompany.climate.service.settings.SettingsPIDСoefficientsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pid")
public class SettingsPIDСoefficientsController {
    @Autowired
    private SettingsPIDСoefficientsService service;

    @PostMapping(value = "/create")
    private void create(@RequestBody SettingsPIDСoefficients settingsPID) {
        service.save(settingsPID);
    }

    @GetMapping(value = "/getLast")
    private List<SettingsPIDСoefficients> getSettingsMode() {
        return service.getLast();
    }

    @GetMapping(value = "/getPIDByName")
    private SettingsPIDСoefficients getModeByName(@RequestParam String name ) {
        return service.getByName(name);
    }

    @PatchMapping(value = "/update")
    private void update(@RequestBody DtoPID dto) {
        service.update(dto);
    }
}
