package com.mycompany.climate.service.settings;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.mycompany.climate.model.dto.SettingsModeForController;
import com.mycompany.climate.model.settings.SettingsMode;
import com.mycompany.climate.model.dto.DtoParamNameNewMode;
import com.mycompany.climate.repository.settings.SettingsModeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SettingsModeService {

    @Autowired
    private SettingsModeRepository repository;

    public void save(SettingsMode settings) {
        repository.save(settings);
    }

    public void update(DtoParamNameNewMode dtoParamNameNewMode) {
        SettingsMode modeObj =  repository.getByName(dtoParamNameNewMode.getParamName());
        modeObj.setMode(dtoParamNameNewMode.getNewMode());
        repository.save(modeObj);
    }

    public SettingsMode getByName(String name) {
        return repository.getByName(name);
    }

    public void delete(SettingsMode settings) {
        repository.delete(settings);
    }

    public List<SettingsMode> getLast(){
        return repository.findAll();
    }

    public ObjectNode sendsendAllPidToController(){
        List<SettingsMode> list = repository.findAll();
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode json = mapper.createObjectNode();
        for(SettingsMode settings : list){
            json.put(settings.getName(),settings.getMode());
        }
        return json;
    }
}
