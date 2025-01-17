package com.mycompany.climate.controller;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mycompany.climate.model.Zone;
import com.mycompany.climate.service.ZoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/zone")
public class ZoneController {

    @Autowired
    ZoneService service;

    @GetMapping("/{id}")
    @ResponseBody
    public Zone getZone(@PathVariable long id) {
        return service.getZoneById(id);
    }

    @GetMapping("/all")
    public List<Zone> getAllZones() {
        return service.getAllZones();
    }

    @PostMapping("/new")
    public void createZone(@RequestBody Zone zone) {
        System.out.println(zone.getTemp());
        service.saveZone(zone);
    }

    @DeleteMapping("/del/{id}")
    @ResponseBody
    public void deleteZone(@PathVariable long id) {
        service.deleteZone(id);
    }

    @DeleteMapping("/del/all")
    public void deleteAllZones() {
        service.deleteAllZones();
    }

    @PutMapping("/update/{id}")
    public void updateZone(@PathVariable long id, @RequestBody Zone zone) {
        service.updateZone(zone);
    }
}
