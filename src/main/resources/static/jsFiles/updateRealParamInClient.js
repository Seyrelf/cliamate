/*Задаем для страницы html функции для переодического выполнения, в основном функции обновляют данные о параметрах системы,
такие как параметры климата снятые с датчиков, состояние оборудования и режимы работы контуров*/
document.addEventListener('DOMContentLoaded', function (){
    updateRealClimate();
    updateRealDevice();
    updateModeChar();
    setInterval(updateRealClimate,5000);
    setInterval(updateRealDevice,5000);
    setInterval(updateModeChar,5000);
})

/*Данная функция отвечает за получения акуального режима работы и его отображения при открытии окна управления контуром*/
async function getModeByName(name){
    try {
        switch (name){
            case "temperatureAirReal":
                data = await getAllMode();
                return data.modeTempAir;
            case "temperatureSoilReal":
                data = await getAllMode();
                return data.modeTempSoil;
            case "humidityAirReal":
                data = await getAllMode();
                return data.modeHumidityAir;
            case "humiditySoilReal":
                data = await getAllMode();
                return data.modeHumiditySoil;
            case "powerVentilatorInReal":
                data = await getAllMode();
                return data.modeVentilation;
            case "carbonDioxideReal":
                data = await getAllMode();
                return data.modeCarbonDioxide;
            case "whiteLightReal":
                data = await getAllMode();
                return data.modeLight;
        }
    }
    catch (err){
        alert(err.message);
        return;
    }
}

/*Данная функция отвечает за получения акуального задания работы оборудования и его отображения при открытии окна
управления оборудованием*/
async function getSettingDeviceByName(name){
    try {
        switch (name){
            case "flapHotWaterReal":
                data = await getSettingsParamDevice();
                return data.flapHotWaterTask;
            case "powerHeatingMatReal":
                data = await getSettingsParamDevice();
                return data.powerHeatingMatTask;
            case "powerVentilatorOutReal":
                data = await getSettingsParamDevice();
                return data.powerVentilatorOutRealTask;
            case "workStatusFlapHumiditySoilReal":
                data = await getSettingsParamDevice();
                return data.workStatusFlapHumiditySoilTask;
            case "workStatusVentilatorHumidityAirReal":
                data = await getSettingsParamDevice();
                return data.workStatusVentilatorHumidityAirTask;
            case "workStatusPumpHumiditySoilReal":
                data = await getSettingsParamDevice();
                return data.workStatusPumpHumiditySoilTask;
            case "workStatusGeneratorHumidityAirReal":
                data = await getSettingsParamDevice();
                return data.workStatusGeneratorHumidityAirTask;
            case "whiteLightPowerReal":
                data = await getSettingsParamDevice();
                return data.whiteLightPowerTask;
            case "redLightPowerReal":
                data = await getSettingsParamDevice();
                return data.redLightPowerTask;
            case "longLightRedPowerReal":
                data = await getSettingsParamDevice();
                return data.longLightRedPowerTask;
            case "blueLightPowerReal":
                data = await getSettingsParamDevice();
                return data.blueLightPowerTask;
            case "uvlightPowerReal":
                data = await getSettingsParamDevice();
                return data.uvlightPowerTask;
        }
    }
    catch (err){
        alert(err.message);
        return;
    }
}

/*Данная функция отвечает за получения акуального задания параметра климата и его отображения при открытии окна
управления оборудованием*/
async function getSettingClimateByName(name){
    try {
        switch (name){
            case "temperatureAirReal":
                data = await getSettingsParamClimate();
                return data.temperatureAirTask;
            case "temperatureSoilReal":
                data = await getSettingsParamClimate();
                return data.temperatureSoilTask;
            case "humidityAirLowReal":
                data = await getSettingsParamClimate();
                return data.humidityAirLowTask;
            case "humidityAirHighReal":
                data = await getSettingsParamClimate();
                return data.humidityAirHighTask;
            case "humiditySoilReal":
                data = await getSettingsParamClimate();
                return data.humiditySoilLowTask;
            case "humiditySoilHighReal":
                data = await getSettingsParamClimate();
                return data.humiditySoilHighTask;
            case "powerVentilatorInReal":
                data = await getSettingsParamDevice();
                return data.powerVentilatorInTask;
            case "carbonDioxideReal":
                data = await getSettingsParamClimate();
                return data.carbonDioxideTask;
            case "whiteLightReal":
                data = await getSettingsParamClimate();
                return data.whiteLightTask;
            case "redLightReal":
                data = await getSettingsParamClimate();
                return data.redLightTask;
            case "longLightRedReal":
                data = await getSettingsParamClimate();
                return data.longLightRedTask;
            case "blueLightReal":
                data = await getSettingsParamClimate();
                return data.blueLightTask;
            case "uvlightReal":
                data = await getSettingsParamClimate();
                return data.uvlightTask;
        }
    }
    catch (err){
        alert(err.message);
        return;
    }
}

/*Данная функция отвечает за получение и обновление данных о текущих параметров климата на страничке */
async function updateRealClimate(){
    try {
        data = await getRealParamClimate();
    }
    catch (err){
        alert(err.message);
        return;
    }
    waterTankLevelHumidityAirReal = data.waterTankLevelHumidityAirReal;
    waterTankLevelHumiditySoilReal = data.waterTankLevelHumiditySoilReal;
    humidityAirReal = data.humidityAirReal;
    humidityAirStreetReal = data.humidityAirStreetReal;
    carbonDioxideReal = data.carbonDioxideReal;
    humiditySoilReal = data.humiditySoilReal;
    whiteLightReal = data.whiteLightReal;
    redLightReal = data.redLightReal;
    blueLightReal = data.blueLightReal;
    longLightRedReal = data.longLightRedReal;
    uvlightReal = data.uvlightReal;
    temperatureAirReal = data.temperatureAirReal;
    temperatureAirStreetReal = data.temperatureAirStreetReal;
    temperatureSoilReal = data.temperatureSoilReal;
    document.getElementById("waterTankLevelHumidityAirReal").textContent = waterTankLevelHumidityAirReal + " %" ;
    document.getElementById("waterTankLevelHumiditySoilReal").textContent = waterTankLevelHumiditySoilReal + " %" ;
    document.getElementById("humidityAirReal").textContent = humidityAirReal + " %" ;
    document.getElementById("humidityAirStreetReal").textContent = humidityAirStreetReal + " %" ;
    document.getElementById("humiditySoilReal").textContent = humiditySoilReal + " %"  ;
    document.getElementById("carbonDioxideReal").textContent =  carbonDioxideReal +" ppm";
    document.getElementById("whiteLightReal").textContent = whiteLightReal + " lx";
    document.getElementById("redLightReal").textContent = redLightReal  + " lx";
    document.getElementById("blueLightReal").textContent = blueLightReal + " lx";
    document.getElementById("longLightRedReal").textContent = longLightRedReal + " lx" ;
    document.getElementById("uvlightReal").textContent = uvlightReal + " lx";
    document.getElementById("temperatureAirReal").textContent = temperatureAirReal + " ℃" ;
    document.getElementById("temperatureAirStreetReal").textContent = temperatureAirReal + " ℃" ;
    document.getElementById("temperatureSoilReal").textContent = temperatureSoilReal + " ℃" ;
}

/*Данная функция отвечает за получение и обновление данных о текущих параметров оборудования на страничке */
async function updateRealDevice(){
    try {
        data = await getRealParamDevice();
    }
    catch (err){
        alert(err.message);
        return;
    }
    flapHotWaterReal = data.flapHotWaterReal;
    powerHeatingMatReal = data.powerHeatingMatReal;
    powerVentilatorInReal = data.powerVentilatorInReal;
    powerVentilatorOutReal = data.powerVentilatorOutReal;
    workStatusPumpHumiditySoilReal = data.workStatusPumpHumiditySoilReal;
    workStatusFlapHumiditySoilReal = data.workStatusFlapHumiditySoilReal;
    workStatusVentilatorHumidityAirReal = data.workStatusVentilatorHumidityAirReal;
    workStatusGeneratorHumidityAirReal = data.workStatusGeneratorHumidityAirReal;
    whiteLightPowerReal = data. whiteLightPowerReal;
    redLightPowerReal = data.redLightPowerReal;
    blueLightPowerReal = data.blueLightPowerReal;
    longLightRedPowerReal = data.longLightRedPowerReal;
    uvlightPowerReal = data.uvlightPowerReal;
    document.getElementById("flapHotWaterReal").textContent = flapHotWaterReal + " %" ;
    document.getElementById("powerHeatingMatReal").textContent = powerHeatingMatReal + " %" ;
    document.getElementById("powerVentilatorInReal").textContent =  powerVentilatorInReal + " %";
    document.getElementById("powerVentilatorOutReal").textContent = powerVentilatorOutReal + " %"  ;
    document.getElementById("workStatusPumpHumiditySoilReal").textContent = workStatusPumpHumiditySoilReal ;
    document.getElementById("workStatusFlapHumiditySoilReal").textContent = workStatusFlapHumiditySoilReal  ;
    document.getElementById("workStatusVentilatorHumidityAirReal").textContent = workStatusVentilatorHumidityAirReal ;
    document.getElementById("workStatusGeneratorHumidityAirReal").textContent = workStatusGeneratorHumidityAirReal  ;
    document.getElementById("whiteLightPowerReal").textContent = whiteLightPowerReal + " %";
    document.getElementById("redLightPowerReal").textContent = redLightPowerReal + " %" ;
    document.getElementById("blueLightPowerReal").textContent = blueLightPowerReal + " %" ;
    document.getElementById("longLightRedPowerReal").textContent = longLightRedPowerReal +  " %" ;
    document.getElementById("uvlightPowerReal").textContent = uvlightPowerReal + " %" ;
}

/*Данная функция отвечает за получение и обновление данных о текущих режимах работы контуров */
async function updateModeChar(){
    try {
        data = await getAllMode();
    }
    catch (err){
        alert(err.message);
        return;
    }
    document.getElementById("modeTempAir").textContent = data.modeTempAir[0] ;
    document.getElementById("modeTempSoil").textContent = data.modeTempSoil[0] ;
    document.getElementById("modeHumidityAir").textContent = data.modeHumidityAir[0] ;
    document.getElementById("modeHumiditySoil").textContent =  data.modeHumiditySoil[0] ;
    document.getElementById("modeLight").textContent = data.modeLight[0] ;
    document.getElementById("modeVentilation").textContent = data.modeVentilation[0] ;
    document.getElementById("modeCarbonDioxide").textContent = data.modeCarbonDioxide[0] ;
}