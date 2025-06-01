package com.mycompany.climate;

import com.mycompany.climate.model.User;
import com.mycompany.climate.model.real.RealParamClimate;
import com.mycompany.climate.model.real.RealParamDevice;
import com.mycompany.climate.model.settings.SettingsClimate;
import com.mycompany.climate.model.settings.SettingsDevice;
import com.mycompany.climate.model.settings.SettingsMode;
import com.mycompany.climate.model.settings.SettingsPIDСoefficients;
import com.mycompany.climate.service.UserService;
import com.mycompany.climate.service.real.RealParamClimateService;
import com.mycompany.climate.service.real.RealParamDeivceService;
import com.mycompany.climate.service.settings.SettingsClimateService;
import com.mycompany.climate.service.settings.SettingsDeviceService;
import com.mycompany.climate.service.settings.SettingsModeService;
import com.mycompany.climate.service.settings.SettingsPIDСoefficientsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;

/*Данный класс отвечает за проверку существующего admin пользователя и создания его в случае отсутствия*/
@Component
public class CommandLineAppStartupRunner implements CommandLineRunner {

    @Autowired
    UserService userService;
    @Autowired
    RealParamClimateService realClimateSerivce;
    @Autowired
    RealParamDeivceService realDeviceService;
    @Autowired
    SettingsPIDСoefficientsService settingsPid;
    @Autowired
    SettingsModeService settingsMode;
    @Autowired
    SettingsClimateService settingsClimate;
    @Autowired
    SettingsDeviceService settingsDevice;

    @Override
    public void run(String... args) throws Exception {
        if(userService.findUserByUsername("admin") == null) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword("010802");
            admin.setRole("ROLE_ADMIN");
            userService.save(admin);
        }
        if(realClimateSerivce.getLast() == null){
            RealParamClimate data = new RealParamClimate(1, LocalDateTime.now(),99999.0,99999.0,99999.0,999999.0,99999,
                    99999,99999.0,99999,99999.0,99999.0,99999.0,99999.0,
                    99999.0,99999.0,99999.0,99999.0);
            realClimateSerivce.save(data);
        }
        if(realDeviceService.getLast() == null){
            RealParamDevice data = new RealParamDevice(1,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,"ВЫКЛ",
                    "ВЫКЛ","ВЫКЛ","ВЫКЛ","ВЫКЛ","ВЫКЛ","ВЫКЛ","ВЫКЛ",-1.0,"ВЫКЛ");
            realDeviceService.save(data);
        }
        if(settingsClimate.getLast() == null){
            SettingsClimate data = new SettingsClimate(1,99999.0,99999.0,99999,99999,99999.0,99999.0,99999.0,99999.0,
                    99999.0,99999.0,99999,99999, LocalTime.now().truncatedTo(ChronoUnit.MINUTES),LocalTime.now().truncatedTo(ChronoUnit.MINUTES),99999.0,99999.0,99999.0,99999.0);
            settingsClimate.save(data);
        }
        if(settingsDevice.getLast() == null){
            SettingsDevice data = new SettingsDevice(1,-1.0,-1.0,-1.0,-1.0,-1.0,-1.0,"ВЫКЛ",
                    "ВЫКЛ","ВЫКЛ","ВЫКЛ","ВЫКЛ","ВЫКЛ","ВЫКЛ","ВЫКЛ","ВЫКЛ",-1.0);
            settingsDevice.save(data);
        }

        if(settingsPid.getByName("regulatorVentilation") == null){
            SettingsPIDСoefficients data = new SettingsPIDСoefficients(1,"regulatorVentilation",0.0,0.0,0.0);
            settingsPid.save(data);}

        if(settingsPid.getByName("regulatorTempAir") == null){
            SettingsPIDСoefficients data = new SettingsPIDСoefficients(2,"regulatorTempAir",0.0,0.0,0.0);
            settingsPid.save(data);}

        if(settingsPid.getByName("regulatorTempSoilOne") == null){
            SettingsPIDСoefficients data = new SettingsPIDСoefficients(3,"regulatorTempSoilOne",0.0,0.0,0.0);
            settingsPid.save(data);}

        if(settingsPid.getByName("regulatorTempSoilTwo") == null){
            SettingsPIDСoefficients data = new SettingsPIDСoefficients(4,"regulatorTempSoilTwo",0.0,0.0,0.0);
            settingsPid.save(data);}

        if(settingsPid.getByName("regulatorTempSoilThree") == null){
            SettingsPIDСoefficients data = new SettingsPIDСoefficients(5,"regulatorTempSoilThree",0.0,0.0,0.0);
            settingsPid.save(data);}

        if(settingsPid.getByName("regulatorLight") == null){
            SettingsPIDСoefficients data = new SettingsPIDСoefficients(6,"regulatorLight",0.0,0.0,0.0);
            settingsPid.save(data);}


        if(settingsMode.getByName("modeVentilation") == null){
            SettingsMode data = new SettingsMode(1,"modeVentilation","Ручной");
            settingsMode.save(data);}

        if(settingsMode.getByName("modeTempAir") == null){
            SettingsMode data = new SettingsMode(2,"modeTempAir","Ручной");
            settingsMode.save(data);}

        if(settingsMode.getByName("modeTempSoilOne") == null){
            SettingsMode data = new SettingsMode(3,"modeTempSoilOne","Ручной");
            settingsMode.save(data);}

        if(settingsMode.getByName("modeTempSoilTwo") == null){
            SettingsMode data = new SettingsMode(4,"modeTempSoilTwo","Ручной");
            settingsMode.save(data);}

        if(settingsMode.getByName("modeTempSoilThree") == null){
            SettingsMode data = new SettingsMode(5,"modeTempSoilThree","Ручной");
            settingsMode.save(data);}

        if(settingsMode.getByName("modeHumidityAir") == null){
            SettingsMode data = new SettingsMode(6,"modeHumidityAir","Ручной");
            settingsMode.save(data);}

        if(settingsMode.getByName("modeHumiditySoilOne") == null){
            SettingsMode data = new SettingsMode(7,"modeHumiditySoilOne","Ручной");
            settingsMode.save(data);}


        if(settingsMode.getByName("modeHumiditySoilTwo") == null){
            SettingsMode data = new SettingsMode(8,"modeHumiditySoilTwo","Ручной");
            settingsMode.save(data);}

        if(settingsMode.getByName("modeHumiditySoilThree") == null){
            SettingsMode data = new SettingsMode(9,"modeHumiditySoilThree","Ручной");
            settingsMode.save(data);}

        if(settingsMode.getByName("modeCarbonDioxide") == null){
            SettingsMode data = new SettingsMode(10,"modeCarbonDioxide","Ручной");
            settingsMode.save(data);}

        if(settingsMode.getByName("modeLight") == null){
            SettingsMode data = new SettingsMode(11,"modeLight","Ручной");
            settingsMode.save(data);
        }
        System.out.println("Приложение запущенно успешно!!!");
    }

}
