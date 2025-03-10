package com.mycompany.climate.service.real;


import com.mycompany.climate.model.real.RealParamDevice;
import com.mycompany.climate.repository.real.RealParamDeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RealParamDeivceService {

    @Autowired
    private RealParamDeviceRepository repository;

    public void save(RealParamDevice device) {
        repository.save(device);
    }

    public  void update(RealParamDevice device) {
        repository.save(device);
    }

    public  void delete(RealParamDevice device) {
        repository.delete(device);
    }

    public RealParamDevice getLast(){
        return repository.findTopByOrderByIdDesc();
    }
}
