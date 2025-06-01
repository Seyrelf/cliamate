

class SettingsClimate{

    public:

        double humidityAirLowTask;
        double humidityAirHighTask;
        int carbonDioxideLowTask;
        int carbonDioxideHighTask;
        double humiditySoilLowTaskOne;
        double humiditySoilHighTaskOne;
        double humiditySoilLowTaskTwo;
        double humiditySoilHighTaskTwo;
        double humiditySoilLowTaskThree;
        double humiditySoilHighTaskThree;
        int whiteLightTask;
        int whiteLightTaskForCO2;
        String startLight;
        String endLight;
        double temperatureAirTask;
        double temperatureSoilTaskOne;
        double temperatureSoilTaskTwo;
        double temperatureSoilTaskThree;

        SettingsClimate(){
            double humidityAirLowTask = 0.0;
            double humidityAirHighTask = 0.0;
            int carbonDioxideLowTask = 0;
            int carbonDioxideHighTask = 0;
            double humiditySoilLowTaskOne = 0.0;
            double humiditySoilHighTaskOne = 0.0;
            double humiditySoilLowTaskTwo = 0.0; 
            double humiditySoilHighTaskTwo = 0.0;
            double humiditySoilLowTaskThree = 0.0;
            double humiditySoilHighTaskThree = 0.0;
            int whiteLightTask = 0;
            int whiteLightTaskForCO2 = 0;
            String startLight;
            String endLight;
            double temperatureAirTask = 0.0;
            double temperatureSoilTaskOne = 0.0;
            double temperatureSoilTaskTwo = 0.0;
            double temperatureSoilTaskThree = 0.0;
        }

        void updateTask(StaticJsonDocument<700> doc){
            humidityAirLowTask = doc["humidityAirLowTask"];
            humidityAirHighTask = doc["humidityAirHighTask"];
            carbonDioxideLowTask = doc["carbonDioxideLowTask"];
            carbonDioxideHighTask = doc["carbonDioxideHighTask"];
            humiditySoilLowTaskOne = doc["humiditySoilLowTaskOne"];
            humiditySoilHighTaskOne = doc["humiditySoilHighTaskOne"];
            humiditySoilLowTaskTwo = doc["humiditySoilLowTaskTwo"];
            humiditySoilHighTaskTwo = doc["humiditySoilHighTaskTwo"];
            humiditySoilLowTaskThree = doc["humiditySoilLowTaskThree"];
            humiditySoilHighTaskThree = doc["humiditySoilHighTaskThree"];
            whiteLightTaskForCO2 = doc["whiteLightTaskForCO2"];
            whiteLightTask = doc["whiteLightTask"];
            startLight =  doc["startLight"].as<String>();
            endLight =  doc["endLight"].as<String>();
            temperatureAirTask = doc["temperatureAirTask"];
            temperatureSoilTaskOne = doc["temperatureSoilTaskOne"];
            temperatureSoilTaskTwo = doc["temperatureSoilTaskTwo"];
            temperatureSoilTaskThree = doc["temperatureSoilTaskThree"];
            doc.clear();}


};
