package com.mycompany.climate.service.settings;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.mycompany.climate.model.dto.DtoPID;
import com.mycompany.climate.model.settings.SettingsPIDСoefficients;
import com.mycompany.climate.repository.settings.SettingsPIDСoefficientsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SettingsPIDСoefficientsService {

    @Autowired
    private SettingsPIDСoefficientsRepository repository;

    public void save(SettingsPIDСoefficients settings) {
        repository.save(settings);
    }

    public void update(DtoPID dto) {
        SettingsPIDСoefficients pid =  repository.getByName(dto.getName());
        pid.setPParam(dto.getParamP());
        pid.setDParam(dto.getParamD());
        pid.setIParam(dto.getParamI());
        repository.save(pid);
    }

    public ObjectNode getAllPidToController(){
        List<SettingsPIDСoefficients> list = repository.findAll();
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode jsonMini = mapper.createObjectNode();
        ObjectNode json = mapper.createObjectNode();
        for(SettingsPIDСoefficients settings : list){
            jsonMini = mapper.createObjectNode();
            jsonMini.put("p",settings.getPParam());
            jsonMini.put("i",settings.getIParam());
            jsonMini.put("d",settings.getDParam());
            json.put(settings.getName(),jsonMini);
        }
        return json;
    }

    public SettingsPIDСoefficients getByName(String name) {
        return repository.getByName(name);
    }

    public void delete(SettingsPIDСoefficients settings) {
        repository.delete(settings);
    }

    public List<SettingsPIDСoefficients> getLast(){
        return repository.findAll();
    }

}
