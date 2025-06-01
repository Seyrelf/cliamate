package com.mycompany.climate;

import com.mycompany.climate.service.real.RealParamDeivceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/*Класс запуска приложения*/
@SpringBootApplication
public class ClimateApplication {


    public static void main(String[] args) {
        SpringApplication.run(ClimateApplication.class, args);


    }

}
