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
        nameForFind = document.getElementById(name).parentElement.parentElement.getElementsByClassName("mode-char")[0].getElementsByClassName("text-center")[0].id;
        data = await getMode(nameForFind);
        return data.mode;
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
            case "powerTempAirReal":
                data = await getSettingsParamDevice();
                return data.powerTempAirTask;
            case "powerHeatingMatRealOne":
                data = await getSettingsParamDevice();
                return data.powerHeatingMatOneTask;
            case "powerHeatingMatRealTwo":
                data = await getSettingsParamDevice();
                return data.powerHeatingMatTwoTask;
            case "powerHeatingMatRealThree":
                data = await getSettingsParamDevice();
                return data.powerHeatingMatThreeTask;
            case "powerFlapOutReal":
                data = await getSettingsParamDevice();
                return data.powerFlapOutTask;
            case "powerVentilatorInReal":
                data = await getSettingsParamDevice();
                return data.powerVentilatorInTask;
            case "workStatusFlapHumiditySoilRealOne":
                data = await getSettingsParamDevice();
                return data.workStatusFlapHumiditySoilTaskOne;
            case "workStatusFlapHumiditySoilRealTwo":
                data = await getSettingsParamDevice();
                return data.workStatusFlapHumiditySoilTaskTwo;
            case "workStatusFlapHumiditySoilRealThree":
                data = await getSettingsParamDevice();
                return data.workStatusFlapHumiditySoilTaskThree;
            case "workStatusVentilatorHumidityAirReal":
                data = await getSettingsParamDevice();
                return data.workStatusVentilatorHumidityAirTask;
            case "workStatusPumpHumiditySoilRealOne":
                data = await getSettingsParamDevice();
                return data.workStatusPumpHumiditySoilTaskOne;
            case "workStatusPumpHumiditySoilRealTwo":
                data = await getSettingsParamDevice();
                return data.workStatusPumpHumiditySoilTaskTwo;
            case "workStatusPumpHumiditySoilRealThree":
                data = await getSettingsParamDevice();
                return data.workStatusPumpHumiditySoilTaskThree;
            case "workStatusGeneratorHumidityAirReal":
                data = await getSettingsParamDevice();
                return data.workStatusGeneratorHumidityAirTask;
            case "whiteLightPowerReal":
                data = await getSettingsParamDevice();
                return data.whiteLightPowerTask;

            case "workStatusFlapCO2Real":
                data = await getSettingsParamDevice();
                return data.workStatusFlapCO2Task;
            case "workStatusVentilatorCO2Real":
                data = await getSettingsParamDevice();
                return data.workStatusVentilatorCO2Task;
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
            case "temperatureSoilRealOne":
                data = await getSettingsParamClimate();
                return data.temperatureSoilTaskOne;
            case "temperatureSoilRealTwo":
                data = await getSettingsParamClimate();
                return data.temperatureSoilTaskTwo;
            case "temperatureSoilRealThree":
                data = await getSettingsParamClimate();
                return data.temperatureSoilTaskThree;
            case "humidityAirReal":
                data = await getSettingsParamClimate();
                return [data.humidityAirLowTask,data.humidityAirHighTask];
            case "humiditySoilRealOne":
                data = await getSettingsParamClimate();
                return [data.humiditySoilLowTaskOne,data.humiditySoilHighTaskOne];
            case "humiditySoilRealTwo":
                data = await getSettingsParamClimate();
                return [data.humiditySoilLowTaskTwo,data.humiditySoilHighTaskTwo];
            case "humiditySoilRealThree":
                data = await getSettingsParamClimate();
                return [data.humiditySoilLowTaskThree,data.humiditySoilHighTaskThree];
            case "powerVentilatorInReal":
                data = await getSettingsParamDevice();
                return data.powerVentilatorInTask;
            case "powerFlapOutReal":
                data = await getSettingsParamDevice();
                return data.powerFlapOutReal;                
            case "carbonDioxideReal":
                data = await getSettingsParamClimate();
                return [data.carbonDioxideLowTask,data.carbonDioxideHighTask];
            case "whiteLightReal":
                data = await getSettingsParamClimate();
                return [data.whiteLightTask,data.startLight,data.endLight];
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
    carbonDioxideTankLevelReal = data.carbonDioxideTankLevelReal;

    humiditySoilRealOne = data.humiditySoilRealOne;
    humiditySoilRealTwo = data.humiditySoilRealTwo;
    humiditySoilRealThree = data.humiditySoilRealThree;
    whiteLightReal = data.whiteLightReal;

    temperatureAirReal = data.temperatureAirReal;
    temperatureAirStreetReal = data.temperatureAirStreetReal;
    temperatureSoilRealOne = data.temperatureSoilRealOne;
    temperatureSoilRealTwo = data.temperatureSoilRealTwo;
    temperatureSoilRealThree = data.temperatureSoilRealThree;




    document.getElementById("waterTankLevelHumidityAirReal").textContent = waterTankLevelHumidityAirReal + " %" ;
    document.getElementById("waterTankLevelHumiditySoilReal").textContent = waterTankLevelHumiditySoilReal + " %" ;
    document.getElementById("humidityAirReal").textContent = humidityAirReal + " %" ;
    document.getElementById("humidityAirStreetReal").textContent = humidityAirStreetReal + " %" ;
    document.getElementById("humiditySoilRealOne").textContent = humiditySoilRealOne + " %"  ;
    document.getElementById("humiditySoilRealTwo").textContent = humiditySoilRealTwo + " %"  ;
    document.getElementById("humiditySoilRealThree").textContent = humiditySoilRealThree + " %"  ;
    document.getElementById("carbonDioxideTankLevelReal").textContent = carbonDioxideTankLevelReal + " %";
    document.getElementById("carbonDioxideReal").textContent =  carbonDioxideReal +" ppm";
    document.getElementById("whiteLightReal").textContent = whiteLightReal + " lx";

    document.getElementById("temperatureAirReal").textContent = temperatureAirReal + " ℃" ;
    document.getElementById("temperatureAirStreetReal").textContent = temperatureAirReal + " ℃" ;
    document.getElementById("temperatureSoilRealOne").textContent = temperatureSoilRealOne + " ℃" ;
    document.getElementById("temperatureSoilRealTwo").textContent = temperatureSoilRealTwo + " ℃" ;
    document.getElementById("temperatureSoilRealThree").textContent = temperatureSoilRealThree + " ℃" ;

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
    powerTempAirReal = data.powerTempAirReal;
    powerHeatingMatRealOne = data.powerHeatingMatRealOne;
    powerHeatingMatRealTwo = data.powerHeatingMatRealTwo;
    powerHeatingMatRealThree = data.powerHeatingMatRealThree;
    powerVentilatorInReal = data.powerVentilatorInReal;
    powerFlapOutReal = data.powerFlapOutReal;
    workStatusPumpHumiditySoilRealOne = data.workStatusPumpHumiditySoilRealOne;
    workStatusPumpHumiditySoilRealTwo = data.workStatusPumpHumiditySoilRealTwo;
    workStatusPumpHumiditySoilRealThree = data.workStatusPumpHumiditySoilRealThree;
    workStatusFlapHumiditySoilRealOne = data.workStatusFlapHumiditySoilRealOne;
    workStatusFlapHumiditySoilRealTwo = data.workStatusFlapHumiditySoilRealTwo;
    workStatusFlapHumiditySoilRealThree = data.workStatusFlapHumiditySoilRealThree;
    workStatusFlapCO2Real = data.workStatusFlapCO2Real;
    workStatusVentilatorCO2Real = data.workStatusVentilatorCO2Real;
    workStatusVentilatorHumidityAirReal = data.workStatusVentilatorHumidityAirReal;
    workStatusGeneratorHumidityAirReal = data.workStatusGeneratorHumidityAirReal;
    whiteLightPowerReal = data.whiteLightPowerReal;

    document.getElementById("powerTempAirReal").textContent = powerTempAirReal + " %" ;
    document.getElementById("powerHeatingMatRealOne").textContent = powerHeatingMatRealOne + " %" ;
    document.getElementById("powerHeatingMatRealTwo").textContent = powerHeatingMatRealTwo + " %" ;
    document.getElementById("powerHeatingMatRealThree").textContent = powerHeatingMatRealThree + " %" ;
    document.getElementById("workStatusFlapCO2Real").textContent = workStatusFlapCO2Real;
    document.getElementById("workStatusVentilatorCO2Real").textContent = workStatusVentilatorCO2Real;
    document.getElementById("powerVentilatorInReal").textContent =  powerVentilatorInReal + " %";
    document.getElementById("powerFlapOutReal").textContent = powerFlapOutReal + " %"  ;
    document.getElementById("workStatusPumpHumiditySoilRealOne").textContent = workStatusPumpHumiditySoilRealOne ;
    document.getElementById("workStatusFlapHumiditySoilRealOne").textContent = workStatusFlapHumiditySoilRealOne  ;
    document.getElementById("workStatusPumpHumiditySoilRealTwo").textContent = workStatusPumpHumiditySoilRealTwo ;
    document.getElementById("workStatusFlapHumiditySoilRealTwo").textContent = workStatusFlapHumiditySoilRealTwo  ;
    document.getElementById("workStatusPumpHumiditySoilRealThree").textContent = workStatusPumpHumiditySoilRealThree ;
    document.getElementById("workStatusFlapHumiditySoilRealThree").textContent = workStatusFlapHumiditySoilRealThree  ;
    document.getElementById("workStatusVentilatorHumidityAirReal").textContent = workStatusVentilatorHumidityAirReal ;
    document.getElementById("workStatusGeneratorHumidityAirReal").textContent = workStatusGeneratorHumidityAirReal  ;
    document.getElementById("whiteLightPowerReal").textContent = whiteLightPowerReal + " %";

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
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
        document.getElementById(data[i].name).textContent = data[i].mode;
    }
}