 class SettingsDevice{

    public:

        double powerTempAirTask;

        double powerHeatingMatOneTask;
        double powerHeatingMatTwoTask;
        double powerHeatingMatThreeTask;


        double powerVentilatorInTask;
        double powerFlapOutTask;

        String workStatusPumpHumiditySoilTaskOne;
        String workStatusFlapHumiditySoilTaskOne;

        String workStatusPumpHumiditySoilTaskTwo;
        String workStatusFlapHumiditySoilTaskTwo;

        String workStatusPumpHumiditySoilTaskThree;
        String workStatusFlapHumiditySoilTaskThree;

        String workStatusVentilatorHumidityAirTask;
        String workStatusGeneratorHumidityAirTask;

        String workStatusFlapCO2Task;

        double whiteLightPowerTask;

        void updateTask(StaticJsonDocument<700> doc){
            powerTempAirTask = doc["powerTempAirTask"];
            powerHeatingMatOneTask = doc["powerHeatingMatOneTask"];
            powerHeatingMatTwoTask = doc["powerHeatingMatTwoTask"];
            powerHeatingMatThreeTask = doc["powerHeatingMatThreeTask"];
            powerVentilatorInTask = doc["powerVentilatorInTask"];
            powerFlapOutTask = doc["powerFlapOutTask"];
            workStatusPumpHumiditySoilTaskOne = doc["workStatusPumpHumiditySoilTaskOne"].as<String>();
            workStatusFlapHumiditySoilTaskOne = doc["workStatusFlapHumiditySoilTaskOne"].as<String>();
            workStatusPumpHumiditySoilTaskTwo = doc["workStatusPumpHumiditySoilTaskTwo"].as<String>();
            workStatusFlapHumiditySoilTaskTwo = doc["workStatusFlapHumiditySoilTaskTwo"].as<String>();
            workStatusPumpHumiditySoilTaskThree = doc["workStatusPumpHumiditySoilTaskThree"].as<String>();
            workStatusFlapHumiditySoilTaskThree = doc["workStatusFlapHumiditySoilTaskThree"].as<String>();
            workStatusVentilatorHumidityAirTask = doc["workStatusVentilatorHumidityAirTask"].as<String>();
            workStatusGeneratorHumidityAirTask = doc["workStatusGeneratorHumidityAirTask"].as<String>();
            workStatusFlapCO2Task = doc["workStatusFlapCO2Task"].as<String>();
            whiteLightPowerTask = doc["whiteLightPowerTask"];
            doc.clear();
        
        }

};
