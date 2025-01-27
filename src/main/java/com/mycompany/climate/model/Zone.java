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

    private double tempSoilReal;
    private double tempSoilHigh;
    private double tempSoilLow;
    private double tempAirReal;
    private double tempAirHigh;
    private double tempAirLow;

    private double dampSoilReal;
    private double dampSoilHigh;
    private double dampSoilLow;
    private double dampAirReal;
    private double dampAirHigh;
    private double dampAirLow;


    private double lightReal;
    private double lightHigh;
    private double lightLow;


    public Zone() {
    }

    public Zone(String name,
                Double tempSoilReal, Double tempSoilHigh, Double tempSoilLow,
                Double tempAirReal,Double tempAirHigh, Double tempAirLow,
                Double dampSoilReal, Double dampSoilHigh, Double dampSoilLow,
                Double dampAirReal,Double dampAirHigh, Double dampAirLow,
                Double lightReal, Double lightHigh, Double lightLow) {
        this.name = name;
        this.tempSoilReal = tempSoilReal;
        this.tempSoilHigh = tempSoilHigh;
        this.tempSoilLow = tempSoilLow;
        this.tempAirReal = tempAirReal;
        this.tempAirHigh = tempAirHigh;
        this.tempAirLow = tempAirLow;
        this.dampSoilReal = dampSoilReal;
        this.dampSoilHigh = dampSoilHigh;
        this.dampSoilLow = dampSoilLow;
        this.dampAirReal = dampAirReal;
        this.dampAirHigh = dampAirHigh;
        this.dampAirLow = dampAirLow;
        this.lightReal = lightReal;
        this.lightHigh = lightHigh;
        this.lightLow = lightLow;



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

    public double getTempSoilReal() {
        return tempSoilReal;
    }

    public void setTempSoilReal(double tempSoilReal) {
        this.tempSoilReal = tempSoilReal;
    }

    public double getTempSoilHigh() {
        return tempSoilHigh;
    }

    public void setTempSoilHigh(double tempSoilHigh) {
        this.tempSoilHigh = tempSoilHigh;
    }

    public double getTempSoilLow() {
        return tempSoilLow;
    }

    public void setTempSoilLow(double tempSoilLow) {
        this.tempSoilLow = tempSoilLow;
    }

    public double getTempAirReal() {
        return tempAirReal;
    }

    public void setTempAirReal(double tempAirReal) {
        this.tempAirReal = tempAirReal;
    }

    public double getTempAirHigh() {
        return tempAirHigh;
    }

    public void setTempAirHigh(double tempAirHigh) {
        this.tempAirHigh = tempAirHigh;
    }

    public double getTempAirLow() {
        return tempAirLow;
    }

    public void setTempAirLow(double tempAirLow) {
        this.tempAirLow = tempAirLow;
    }

    public double getDampSoilReal() {
        return dampSoilReal;
    }

    public void setDampSoilReal(double dampSoilReal) {
        this.dampSoilReal = dampSoilReal;
    }

    public double getDampSoilHigh() {
        return dampSoilHigh;
    }

    public void setDampSoilHigh(double dampSoilHigh) {
        this.dampSoilHigh = dampSoilHigh;
    }

    public double getDampSoilLow() {
        return dampSoilLow;
    }

    public void setDampSoilLow(double dampSoilLow) {
        this.dampSoilLow = dampSoilLow;
    }

    public double getDampAirReal() {
        return dampAirReal;
    }

    public void setDampAirReal(double dampAirReal) {
        this.dampAirReal = dampAirReal;
    }

    public double getDampAirHigh() {
        return dampAirHigh;
    }

    public void setDampAirHigh(double dampAirHigh) {
        this.dampAirHigh = dampAirHigh;
    }

    public double getDampAirLow() {
        return dampAirLow;
    }

    public void setDampAirLow(double dampAirLow) {
        this.dampAirLow = dampAirLow;
    }

    public double getLightReal() {
        return lightReal;
    }

    public void setLightReal(double lightReal) {
        this.lightReal = lightReal;
    }

    public double getLightHigh() {
        return lightHigh;
    }

    public void setLightHigh(double lightHigh) {
        this.lightHigh = lightHigh;
    }

    public double getLightLow() {
        return lightLow;
    }

    public void setLightLow(double lightLow) {
        this.lightLow = lightLow;
    }


    @Override
    public String toString() {
        return "Zone{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", tempSoilReal=" + tempSoilReal +
                ", tempSoilHigh=" + tempSoilHigh +
                ", tempSoilLow=" + tempSoilLow +
                ", tempAirReal=" + tempAirReal +
                ", tempAirHigh=" + tempAirHigh +
                ", tempAirLow=" + tempAirLow +
                ", dampSoilReal=" + dampSoilReal +
                ", dampSoilHigh=" + dampSoilHigh +
                ", dampSoilLow=" + dampSoilLow +
                ", dampAirReal=" + dampAirReal +
                ", dampAirHigh=" + dampAirHigh +
                ", dampAirLow=" + dampAirLow +
                ", lightReal=" + lightReal +
                ", lightHigh=" + lightHigh +
                ", lightLow=" + lightLow +
                '}';
    }
}
