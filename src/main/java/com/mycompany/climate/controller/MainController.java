package com.mycompany.climate.controller;

import com.mycompany.climate.model.Zone;
import com.mycompany.climate.service.ZoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Controller
public class MainController {

    @Autowired
    private ZoneService zoneService;

    @GetMapping("/home")
    public String home(Model model) {
        List<Zone> zones = zoneService.getAllZones();
        model.addAttribute("zones", zones);
        return "home";
    }
}
