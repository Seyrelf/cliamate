package com.mycompany.climate.model.dto;

import lombok.Data;

import java.time.LocalTime;

@Data
public class DtoClimateNewTaskForLight {
    private String paramName;
    private int paramTask;
    private LocalTime startLight;
    private LocalTime endLight;
}
