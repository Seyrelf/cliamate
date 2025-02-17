package com.mycompany.climate.service;

import com.mycompany.climate.model.Zone;
import com.mycompany.climate.repository.ZoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class ZoneService {

    @Autowired
    private ZoneRepository repository;

    public Zone getZoneById(long id) {
        return repository.getReferenceById(id);
    }

    public void saveZone(Zone zone) {
        repository.save(zone);
    }

    public List<Zone> getAllZones() {
        return repository.findAll();
    }

    public void deleteZone(long id) {
        repository.deleteById(id);
    }

    public void deleteAllZones() {
        repository.deleteAll();
    }

    public void updateZone(Zone zone) {
        repository.save(zone);
    }
}
