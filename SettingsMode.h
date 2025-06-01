class SettingsMode{

    public:
    
        String modeTempAir;
        String modeTempSoilOne;
        String modeTempSoilTwo;
        String modeTempSoilThree;
        String modeHumidityAir;
        String modeHumiditySoilOne;
        String modeHumiditySoilTwo;
        String modeHumiditySoilThree;
        String modeLight;
        String modeVentilation;
        String modeCarbonDioxide;

        void updateTask(StaticJsonDocument<700> doc){
            modeTempAir = doc["modeTempAir"].as<String>();
            modeTempSoilOne =  doc["modeTempSoilOne"].as<String>();
            modeTempSoilTwo = doc["modeTempSoilTwo"].as<String>();
            modeTempSoilThree =  doc["modeTempSoilThree"].as<String>();
            modeHumidityAir =  doc["modeHumidityAir"].as<String>();
            modeHumiditySoilOne =  doc["modeHumiditySoilOne"].as<String>();
            modeHumiditySoilTwo =  doc["modeHumiditySoilTwo"].as<String>();
            modeHumiditySoilThree =  doc["modeHumiditySoilThree"].as<String>();
            modeLight =  doc["modeLight"].as<String>();
            modeVentilation =  doc["modeVentilation"].as<String>();
            modeCarbonDioxide =  doc["modeCarbonDioxide"].as<String>();
            doc.clear();
            
            }





};
