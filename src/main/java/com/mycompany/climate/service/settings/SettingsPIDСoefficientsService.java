package com.mycompany.climate.service.settings;

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
