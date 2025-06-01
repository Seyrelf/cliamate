package com.mycompany.climate.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @Value("${base-url}")
    private String baseUrl;


    @GetMapping("/home")
    public String home(Model model) {
        model.addAttribute("baseUrl", baseUrl);
        return "home";
    }
}
