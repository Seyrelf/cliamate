package com.mycompany.climate.controller.settings;

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

    @PostMapping(value = "/test")
    private void test(String string) {
        System.out.println(string);

    }

    @GetMapping(value = "/getLast")
    private List<SettingsMode> getSettingsMode() {
        return service.getLast();
    }

    @GetMapping(value = "/getModeByName")
    private SettingsMode getModeByName(String name) {
        return service.getByName(name);
    }

    @PatchMapping(value = "/update")
    private void update(@RequestBody DtoParamNameNewMode dtoParamNameNewMode) {
        service.update(dtoParamNameNewMode);
    }
}
