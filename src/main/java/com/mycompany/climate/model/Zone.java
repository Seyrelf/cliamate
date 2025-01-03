package com.mycompany.climate.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Zone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private double temp;
    private double damp;
    private double light;

    public Zone() {
    }

    public Zone(String name, double temp, double damp, double light) {
        this.name = name;
        this.temp = temp;
        this.damp = damp;
        this.light = light;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getTemp() {
        return temp;
    }

    public void setTemp(double temp) {
        this.temp = temp;
    }

    public double getDamp() {
        return damp;
    }

    public void setDamp(double damp) {
        this.damp = damp;
    }

    public double getLight() {
        return light;
    }

    public void setLight(double light) {
        this.light = light;
    }
}
