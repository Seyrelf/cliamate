package com.mycompany.climate.controller;

import com.mycompany.climate.model.Zone;
import com.mycompany.climate.service.ZoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("/zone")
public class ZoneController {

    @Autowired
    ZoneService service;

    @GetMapping("/{id}")
    @ResponseBody
    public Zone getZone(@PathVariable int id) {
        return service.getZoneById(id);
    }

    @GetMapping("/all")
    public List<Zone> getAllZones() {
        return service.getAllZones();
    }

    @PostMapping("/new")
    public void createZone(@RequestBody Zone zone) {
        service.saveZone(zone);
    }
}
