package com.mycompany.climate.model.dto;

import lombok.Data;

import java.time.LocalTime;

@Data
public class DtoClimateNewTaskForCO2 {

    private String paramName;
    private Integer paramTaskLow;
    private Integer paramTaskHigh;
    private int minLightTask;

}
