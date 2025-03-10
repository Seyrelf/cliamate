package com.mycompany.climate.service.real;


import com.mycompany.climate.model.real.RealParamClimate;
import com.mycompany.climate.repository.real.RealParamClimateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RealParamClimateService {

    @Autowired
    private RealParamClimateRepository repository;

    public void save(RealParamClimate realParamClimate) {
        repository.save(realParamClimate);
    }

    public void update(RealParamClimate realParamClimate) {
        repository.save(realParamClimate);
    }

    public void delete(RealParamClimate realParamClimate) {
        repository.delete(realParamClimate);
    }

    public RealParamClimate getLast(){
        return repository.findTopByOrderByIdDesc();
    }
}
