package com.mycompany.climate.controller.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.mycompany.climate.model.dto.DtoUpdateRealClimate;
import com.mycompany.climate.model.dto.DtoUpdateRealDevice;
import com.mycompany.climate.service.real.RealParamClimateService;
import com.mycompany.climate.service.real.RealParamDeivceService;
import com.mycompany.climate.service.settings.SettingsClimateService;
import com.mycompany.climate.service.settings.SettingsDeviceService;
import com.mycompany.climate.service.settings.SettingsModeService;
import com.mycompany.climate.service.settings.SettingsPIDСoefficientsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/plc")
public class PLCController {

    @Autowired
    private RealParamClimateService serviceRealClimate;
    @Autowired
    private RealParamDeivceService serviceRealDevice;
    @Autowired
    private SettingsPIDСoefficientsService servicePID;
    @Autowired
    private SettingsModeService serviceMode;
    @Autowired
    private SettingsClimateService serviceSettingsClimate;
    @Autowired
    private SettingsDeviceService serviceSettingsDevice;

    @GetMapping(value = "/getLast")
    private String getRealParamDevice() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        ObjectNode jsonObject = mapper.createObjectNode();
        jsonObject.set("mode", mapper.valueToTree(serviceMode.sendAllModeToController()));
        jsonObject.set("pid", mapper.valueToTree(servicePID.getAllPidToController()));
        jsonObject.set("climate", mapper.valueToTree(serviceSettingsClimate.getLast()));
        jsonObject.set("device", mapper.valueToTree(serviceSettingsDevice.getLast()));
        String json = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(jsonObject);
        return json;
    }

    @PatchMapping(value = "/update")
    private void update(JsonNode allData) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        serviceRealClimate.updateLast(mapper.treeToValue(allData.get("climate"), DtoUpdateRealClimate.class));
        serviceRealDevice.updateLast(mapper.treeToValue(allData.get("device"), DtoUpdateRealDevice.class));
    }
}
