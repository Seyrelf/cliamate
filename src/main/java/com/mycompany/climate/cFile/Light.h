class Light {
  private:

    String mode;
    double whiteLightTask;
    double whiteLightReal;
    double whiteLightPowerReal;
    double whiteLightPowerTask;


    double redLightTask;
    double redLightReal;
    double redLightPowerReal;
    double redLightPowerTask;

    double blueLightTask;
    double blueLightReal;
    double blueLightPowerReal;
    double blueLightPowerTask;


    double longLightRedTask;
    double longLightRedReal;
    double longLightPowerReal;
    double longLightPowerTask;

    double UVLightReal;
    double UVLightTask;
    double UVLightPowerReal;
    double UVLightPowerTask;


  public:

    Light(String modeNew, double whiteLightTaskNew,double whiteLightRealNew,double whiteLightPowerNew,double redLightTaskNew,double redLightRealNew,double redLightPowerNew,double blueLightTaskNew,double blueLightRealNew,double blueLightPowerNew,double longLightRedTaskNew,double longLightRedRealNew,double longLightPowerNew,double UVLightRealNew,double UVLightTaskNew,double UVLightPowerNew){

        mode = modeNew;
        whiteLightTask = whiteLightTaskNew;
        whiteLightReal = whiteLightRealNew;
        whiteLightPower = whiteLightPowerNew;
        redLightTask = redLightTaskNew;
        redLightReal = redLightRealNew;
        redLightPower = redLightPowerNew;
        blueLightTask = blueLightTaskNew;
        blueLightReal = blueLightRealNew;
        blueLightPower = blueLightPowerNew;
        longLightRedTask = longLightRedTaskNew;
        longLightRedReal = longLightRedRealNew;
        longLightPower = longLightPowerNew;
        UVLightReal = UVLightRealNew;
        UVLightTask = UVLightTaskNew;
        UVLightTask = UVLightTaskNew;




    }

    void setWhiteLightTask (double whiteLightTaskNew){
        whiteLightTask = whiteLightTaskNew;}

    void setWhiteLightReal(double whiteLightRealNew){
        whiteLightReal = whiteLightRealNew;}

    void setWhiteLightPower(double whiteLightPowerNew){
        whiteLightPower = whiteLightPowerNew;}

    void setRedLightTask(double redLightTaskNew){
        redLightTask = redLightTaskNew;}

    void setRedLightReal(double redLightRealNew){
        redLightReal = redLightRealNew;}

    void setRedLightPower(double redLightPowerNew){
        redLightPower = redLightPowerNew;}

    void setBlueLightTask(double blueLightTaskNew){
        blueLightTask = blueLightTaskNew;}

    void setBlueLightReal(double blueLightRealNew){
        blueLightReal = blueLightRealNew;}

    void setBlueLightPower(double blueLightPowerNew){
        blueLightPower = blueLightPowerNew;}

    void setLongLightRedTask(double longLightRedTaskNew){
        longLightRedTask = longLightRedTaskNew;}

    void setLongLightRedReal(double longLightRedRealNew){
        longLightRedReal = longLightRedRealNew;}

    void setLongLightPower(double longLightPowerNew){
        longLightPower = longLightPowerNew;}

    void setUVLightReal(double UVLightRealNew){
        UVLightReal = UVLightRealNew;}

    void setUVLightTask(double UVLightTaskNew){
        UVLightTask = UVLightTaskNew;}

    void setUVLightPower(double UVLightPowerNew){
        UVLightPower = UVLightPower;}

    void setMode(String ModeNew){
        mode = modeNew;}



    Zone(JsonObject json){
      id = json["id"];
      name =  json["name"].as<String>();
      tempSoilReal = json["tempSoilReal"];
      tempSoilHigh = json["tempSoilHigh"];
      tempSoilLow = json["tempSoilLow"];
      tempAirReal = json["tempAirReal"];
      tempAirHigh = json["tempAirHigh"];
      tempAirLow = json["tempAirLow"];

      dampSoilReal = json["dampSoilReal"];
      dampSoilHigh = json["dampSoilHigh"];
      dampSoilLow = json["dampSoilLow"];
      dampAirReal = json["dampAirReal"];
      dampAirHigh = json["dampAirHigh"];
      dampAirLow = json["dampAirLow"];

      lightReal = json["lightReal"];
      lightHigh = json["lightHigh"];
      lightLow = json["lightLow"];
    }


   String toJsonString(){
    String res = "{\"whiteLightTask\":" + (String)whiteLightTask + ",\"whiteLightReal\":" + (String)whiteLightReal + ",\"whiteLightPower\":" + (String)whiteLightPower;
    res += ",\"redLightTaskl\":" + (String)redLightTask + ",\"redLightReal\":" + (String)redLightReal + ",\"redLightPower\":" + (String)redLightPower;
    res += ",\"blueLightTask\":" + (String)blueLightTask + ",\"blueLightReal\":" + (String)blueLightReal + ",\"blueLightPower\":" + (String)blueLightPower;
    res += ",\"longLightRedTask\":" + (String)longLightRedTask + ",\"longLightRedReal\":" + (String)longLightRedReal + ",\"longLightPower\":" + (String)longLightPower;
    res += ",\"UVLightReal\":" + (String)UVLightReal + ",\"UVLightTask\":" + (String)UVLightTask + ",\"UVLightPower\":" + (String)UVLightPower+"},";
    return res;
   }

};