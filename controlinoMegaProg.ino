#include <Ethernet.h>
#include <EthernetClient.h>
#include <ArduinoJson.h>
#include <stdLib.h>
#include <ModbusMaster.h> 
#include <Controllino.h>
#include "RealParamClimate.h"
#include "RealParamDevice.h"
#include "SettingsClimate.h"
#include "SettingsDevice.h"
#include "SettingsMode.h"
#include "GyverPID.h"
#include <HX711.h>
#include <Adafruit_PWMServoDriver.h>

int ethernetTryConnect = 0;
HX711 scale;
int serverPort = 8080;
byte mac[] = {
  0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED
};
IPAddress PlcIP(169,254,235,169);
IPAddress serverIP(169,254,235,28);
EthernetClient client;
const int maxPower = 4096;
const double waterLVLMin = 10;
ModbusMaster sensor;


//RS-485 номера датчиков
const int sensorAirOneRSNumber = 1;
const int sensorAirTwoRSNumber = 2;
const int sensorAirThreeRSNumber = 3;
const int sensorAirStreetRSNumber = 4;
const int sensorSoilOneRSNumber = 5;
const int sensorSoilTwoRSNumber = 6;
const int sensorSoilThreeRSNumber = 7;
const int sensorCO2OneRSNumber = 8;
const int sensorCO2TwoRSNumber = 9;
const int sensorCO2ThreeRSNumber = 10;
const int sensorCO2StreetRSNumber = 11;
const int sensorLightOneRSNumber = 12;
const int sensorLightTwoRSNumber = 13;
const int sensorLightThreeRSNumber = 14;


//Пины для подключения АЦП для считывания веса баллона
const int sensorMCO2NumberFirstPin = 9;//D7
const int sensorMCO2NumberSecondPin = 10;//D8

//Пины для подключения датчиков уровня жидкости
const int sensorWaterLevelOneANumber = A4;
const int sensorWaterLevelTwoANumber = A5;


//Пины для подключения устройств на релейные выходы
const int pumpOneNumber = 22;//R0
const int pumpTwoNumber = 23;//R1
const int pumpThreeNumber = 24;//R2
const int flapPolivOneNumber = 25;//R3
const int flapPolivTwoNumber = 26;//R4
const int flapPolivThreeNumber = 27;//R5
const int flapCO2Number = 28;//R6
const int generatorHumidityNumber = 42;//D12
const int ventilatorHumidityNumber = 32;//R10

//Пины для подключения устройств на pwm выходы
const int pwmForTempSoilOneNumber = 2;//pwm port
const int pwmForTempSoilTwoNumber = 3;//pwm port
const int pwmForTempSoilThreeNumber = 4;//pwm port
const int pwmForTempAirNumberOne = 5;//pwm port
const int pwmForTempAirNumberTwo = 6;//pwm port
const int pwmForVentilatorVentilationNumber = 7;//pwm port
const int pwmForVentilationFlapNumber = 8;//pwm port

//Список пинов для управления светильнками через внешний модуль MegaD16
int activeChannelsLight[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12};

int numChannels = sizeof(activeChannelsLight) / sizeof(activeChannelsLight[0]);

//Подключение внешнего модуля
Adafruit_PWMServoDriver megaD16Pwm = Adafruit_PWMServoDriver(0x40);


//Переменная для хранения заданий климата
SettingsClimate taskClimate;

//Переменная для хранения заданий механизмов
SettingsDevice taskDevice;

//Переменная для хранения режимов
SettingsMode taskMode;

//Переменная для хранения параметров механизмов
RealParamDevice paramDevice;

//Переменная для хранения параметров климата
RealParamClimate paramClimate;

//Ссылка на получение данных
const char* linkForSendRealClimate = "/realParamClimate/update";
//Ссылка на отправку данных
const char* linkForSendRealDevice = "/realDeviceClimate/update";


//Регулятор управления мощности светильников через внешний модуль
GyverPID regulatorLight(1,1,1);
int minPwmLight = 0;
int maxPwmLight = 3412.5;

//Регулятор управления мощности ИК обогревателей через mp248
GyverPID regulatorTempAir(1,1,1);
int minPwmRegulatorTempAir = 0;
int maxPwmRegulatorTempAir = 53;

//Регулятор управления мощности греющего кабеля зоны 1 через mp248
GyverPID regulatorTempSoilOne(1,1,1);
int minPwmRegulatorTempSoilOne = 0;
int maxPwmRegulatorTempSoilOne = 53;

//Регулятор управления мощности греющего кабеля зоны 2 через mp248
GyverPID regulatorTempSoilTwo(1,1,1);
int minPwmRegulatorTempSoilTwo = 0;
int maxPwmRegulatorTempSoilTwo = 53;

//Регулятор управления мощности греющего кабеля зоны 3 через mp248
GyverPID regulatorTempSoilThree(1,1,1);
int minPwmRegulatorTempSoilThree = 0;
int maxPwmRegulatorTempSoilThree = 53;


//Регулятор управления мощности вентиляторов вентиляции через mp248
GyverPID regulatorVentilation(1,1,1);
int minPwmVentilation = 0;
int maxPwmVentilation = 53;

//Регулятор управления положения вентиляционных клапанов через внешний модуль
GyverPID regulatorVentilationClap(1,1,1);
int minPwmVentilationClap = 0;
int maxPwmVentilationClap = 4016;

//Подключение к сети
void connectEthernet(){
  Ethernet.begin(mac, PlcIP);
  delay(3000);
  Serial.println("connecting...");
  if (client.connect(serverIP, serverPort)) {
    Serial.println("Подключено к серверу!");
    client.stop();
  } else {
    Serial.println("Ошибка подключения!");
  }
}

//Сравнение времени
bool chechTime(){
  String startTime = taskClimate.startLight;
  String endTime = taskClimate.endLight;
  int startHours, startMinutes, startSeconds;
  int endHours, endMinutes, endSeconds;
  sscanf(startTime.c_str(), "%d:%d:%d", &startHours, &startMinutes, &startSeconds);
  sscanf(endTime.c_str(), "%d:%d:%d", &endHours, &endMinutes, &endSeconds);
  int startNum = startHours * 60 + startMinutes;
  int nowNum = 1200;
  int endNum = endHours * 60 + endMinutes;
  if((startNum < nowNum) && (nowNum < endNum)){
    return true;
  }
  else{
    return false;
  }
}

//Проверка подключения к интернету
bool chechEthernet(){

  if (client.connect(serverIP, serverPort)){
    ethernetTryConnect = 0;
    return true;
  }
  else{
    ethernetTryConnect += 1;
    if(ethernetTryConnect == 20){
      connectEthernet();
      ethernetTryConnect = 0;
    }
    Serial.println("Нет подключения к интернету");
    return false;
  }
}

//Отправка данных на сервер общая
void sendDataToServer(String link,String data){
  Serial.println("Отправка данных");
  Serial.println(data);
  client.connect(serverIP, serverPort);
  client.println("PATCH " + link + " HTTP/1.1");
  client.println("Host: 169.254.235.28:8080");
  client.println("Content-Type: application/json");
  client.print("Content-Length: ");
  client.println(data.length());
  client.println("Connection: close");
  client.println();
  client.println(data);
  client.stop();
}

//Обновление параметров ПИД регулирования
void updatePID(StaticJsonDocument<700> data){
  StaticJsonDocument<100> obj;

  obj.set(data["regulatorTempAir"]);
  regulatorTempAir.Kp = obj["p"];
  regulatorTempAir.Ki = obj["i"];
  regulatorTempAir.Kd = obj["d"];

  obj.set(data["regulatorTempSoilOne"]);
  regulatorTempSoilOne.Kp = obj["p"];
  regulatorTempSoilOne.Ki = obj["i"];
  regulatorTempSoilOne.Kd = obj["d"];

  obj.set(data["regulatorTempSoilTwo"]);
  regulatorTempSoilTwo.Kp = obj["p"];
  regulatorTempSoilTwo.Ki = obj["i"];
  regulatorTempSoilTwo.Kd = obj["d"];

  obj.set(data["regulatorTempSoilThree"]);
  regulatorTempSoilThree.Kp = obj["p"];
  regulatorTempSoilThree.Ki = obj["i"];
  regulatorTempSoilThree.Kd = obj["d"];

  obj.set(data["regulatorLight"]);
  regulatorLight.Kp = obj["p"];
  regulatorLight.Ki = obj["i"];
  regulatorLight.Kd = obj["d"];

  obj.set(data["regulatorVentilation"]);
  Serial.println(obj.as<String>());
  regulatorVentilation.Kp = obj["p"];
  regulatorVentilation.Ki = obj["i"];
  regulatorVentilation.Kd = obj["d"];
  Serial.println(regulatorVentilation.Kp);

  data.clear();
  obj.clear();
}

//Получение данных с сервера
void getDataFromServer(){
  Serial.println("start");
  client.connect(serverIP, serverPort);
  client.println("GET /plc/getLast HTTP/1.1");
  client.println("Host: 169.254.235.28:8080");
  client.println("Connection: close");
  client.println();
  while (client.connected()) {
      String line = client.readStringUntil('\n');
      if (line == "\r") { // Конец заголовков
        break;
      }}
  client.setTimeout(500);
  StaticJsonDocument<1900> doc;
  DeserializationError error = deserializeJson(doc, client);
  client.stop();
  Serial.println();
  if(!doc.isNull()){
    taskClimate.updateTask(doc["climate"]);
    taskDevice.updateTask(doc["device"]);
    taskMode.updateTask(doc["mode"]);
    updatePID(doc["pid"]);
    Serial.println(taskDevice.whiteLightPowerTask);
    Serial.println(regulatorVentilation.Kp);
}}

//Отправка данных климата на сервер
void sendRealParamClimate(){
    StaticJsonDocument<800> doc;
    doc["humidityAirReal"] =  paramClimate.humidityAirReal;
    doc["humidityAirStreetReal"] = paramClimate.humidityAirStreetReal;
    doc["temperatureAirReal"] = paramClimate.temperatureAirReal;
    doc["temperatureAirStreetReal"] = paramClimate.temperatureAirStreetReal;
    doc["temperatureSoilRealOne"] = paramClimate.temperatureSoilRealOne;
    doc["temperatureSoilRealTwo"] = paramClimate.temperatureSoilRealTwo;
    doc["temperatureSoilRealThree"] = paramClimate.temperatureSoilRealThree;
    doc["humiditySoilRealOne"] = paramClimate.humiditySoilRealOne;
    doc["humiditySoilRealTwo"] = paramClimate.humiditySoilRealTwo;
    doc["humiditySoilRealThree"] = paramClimate.humiditySoilRealThree;
    doc["waterTankLevelHumidityAirReal"] = paramClimate.waterTankLevelHumidityAirReal;
    doc["waterTankLevelHumiditySoilReal"] = paramClimate.waterTankLevelHumiditySoilReal;
    doc["carbonDioxideReal"] = paramClimate.carbonDioxideReal;
    doc["carbonDioxideStreetReal"] = paramClimate.carbonDioxideStreetReal;
    doc["carbonDioxideTankLevelReal"] = paramClimate.carbonDioxideTankLevelReal;
    doc["whiteLightReal"] = paramClimate.whiteLightReal;
    String jsonString;
    serializeJson(doc, jsonString);
    sendDataToServer(linkForSendRealClimate,jsonString);
}


//Отправка данных мехагизмов на сервер
void sendRealParamDevice() {
    StaticJsonDocument<800> doc;
    doc["powerTempAirReal"] = paramDevice.powerTempAirReal;
    doc["powerHeatingMatRealOne"] = paramDevice.powerHeatingMatRealOne;
    doc["powerHeatingMatRealTwo"] = paramDevice.powerHeatingMatRealTwo;
    doc["powerHeatingMatRealThree"] = paramDevice.powerHeatingMatRealThree;
    doc["powerVentilatorInReal"] = paramDevice.powerVentilatorInReal;
    doc["powerFlapOutReal"] = paramDevice.powerFlapOutReal;
    doc["workStatusPumpHumiditySoilRealOne"] = paramDevice.workStatusPumpHumiditySoilRealOne;
    doc["workStatusFlapHumiditySoilRealOne"] = paramDevice.workStatusFlapHumiditySoilRealOne;
    doc["workStatusPumpHumiditySoilRealTwo"] = paramDevice.workStatusPumpHumiditySoilRealTwo;
    doc["workStatusFlapHumiditySoilRealTwo"] = paramDevice.workStatusFlapHumiditySoilRealTwo;
    doc["workStatusPumpHumiditySoilRealThree"] = paramDevice.workStatusPumpHumiditySoilRealThree;
    doc["workStatusFlapHumiditySoilRealThree"] = paramDevice.workStatusFlapHumiditySoilRealThree;
    doc["workStatusVentilatorHumidityAirReal"] = paramDevice.workStatusVentilatorHumidityAirReal;
    doc["workStatusGeneratorHumidityAirReal"] = paramDevice.workStatusGeneratorHumidityAirReal;
    doc["workStatusFlapCO2Real"] = paramDevice.workStatusFlapCO2Real;
    doc["whiteLightPowerReal"] = paramDevice.whiteLightPowerReal;
    String jsonString;
    serializeJson(doc, jsonString);
    sendDataToServer(linkForSendRealDevice,jsonString);
}

//Фильтрование значений трех датчиков одного контура
double getAverageDataFromSensors(double data[3], double THRESHOLD){
  double validData[3];
  int validCount = 0;
  for (int i = 0; i < 3; i++) {
    if (data[i] != 99999.0) {
      validData[validCount++] = data[i];
    }
  }
  if (validCount == 3) {
    double avg = (validData[0] + validData[1] + validData[2]) / 3;
    double diff1 = abs(validData[0] - avg);
    double diff2 = abs(validData[1] - avg);
    double diff3 = abs(validData[2] - avg);
    int newValidCount = 0;
    double newValidData[3];
    for (int i = 0; i < 3; i++) {
      if (abs(validData[i] - avg) <= THRESHOLD) {
        newValidData[newValidCount++] = validData[i];
      }
    }
    validCount = newValidCount;
    memcpy(validData, newValidData, sizeof(float) * newValidCount);

  }
  if (validCount > 0) {
    double avgData = 0;
    Serial.print("Корректные датчики: ");
    for (int i = 0; i < validCount; i++) {
      avgData += validData[i];
      Serial.print(validData[i]);
    }
    avgData /= validCount;
    Serial.print("\nСреднее значение: ");
    Serial.print(avgData);
    return avgData;
  }
  else {
    Serial.println("Нет корректных данных!");
    return 99999.0;
  }
}



//Получение информации с датчика темпераутры, влажности,CO2
double getDataFromSensorModbus(int sensorNum,uint16_t reg){
  uint8_t result;
  double data;
  sensor.begin(sensorNum, Serial1);
  result = sensor.readInputRegisters(reg, 1);
  if (result == sensor.ku8MBSuccess) {
    data = sensor.getResponseBuffer(0) / 10;  // Масштабирование
  } else {
    Serial.print("Ошибка чтения датчика " + sensorNum);
    Serial.print(". Код ошибки: ");
    Serial.println(result);
    data = 99999.0;
  }
  return data;
}

//Получение информации с датчика CO2 и Освещения
double getDataFromSensorModbusTwo(int sensorNum,uint16_t reg){
  uint8_t result;
  double data;

  sensor.begin(sensorNum, Serial1);
  result = sensor.readInputRegisters(reg, 1);
  if (result == sensor.ku8MBSuccess) {
    data = sensor.getResponseBuffer(0);  // Масштабирование
  } else {
    Serial.print("Ошибка чтения датчика " + sensorNum);
    Serial.print(". Код ошибки: ");
    Serial.println(result);
    data = 99999.0;
  }
  return data;
}

int getAverageDataFromINTSensors(double data[3], double THRESHOLD){
  double dataInt = getAverageDataFromSensors(data,THRESHOLD);
  return (int)dataInt;
}



double getDataFromWaterLVLSensor(int sensorNumber,double maxLvl){
  int data = analogRead(sensorNumber);
  double lvl = (data / 387) *  (200 / maxLvl);
  return lvl;
}



double getDataFromCO2PASensor(){
  double data = scale.get_units(5);
  return (data - 70.0) / 70 * 100;
}

void tempAirConturReg(){
  double data[3];
  data[0] = getDataFromSensorModbus(sensorAirOneRSNumber,0x0000);
  data[1] = getDataFromSensorModbus(sensorAirTwoRSNumber,0x0000);
  data[2] = getDataFromSensorModbus(sensorAirThreeRSNumber,0x0000);
  const double tempReal = getAverageDataFromSensors(data,2.0);
  const double tempTask = taskClimate.temperatureAirTask;
  const String mode = taskMode.modeTempAir;
  double powerTask = 0;
  if(mode == "Автоматический"){
    regulatorTempAir.setpoint = tempTask;
    regulatorTempAir.input = tempReal;
    regulatorTempAir.getResultTimer();
    powerTask = regulatorTempAir.output;
    }
  else{
    powerTask = taskDevice.powerTempAirTask / 100 * maxPower;
  }
  analogWrite(pwmForTempAirNumberOne,powerTask);
  analogWrite(pwmForTempAirNumberTwo,powerTask);
  paramDevice.powerTempAirReal = powerTask*100/maxPower;
  paramClimate.temperatureAirReal = tempReal;
}

void tempSoilConturRegOne(){
  double powerTask;
  const double tempReal = getDataFromSensorModbus(sensorSoilOneRSNumber,0x0001);
  const double tempTask = taskClimate.temperatureSoilTaskOne;
  const String mode = taskMode.modeTempSoilOne;
  if(mode == "Автоматический"){
    regulatorTempSoilOne.setpoint = tempTask;
    regulatorTempSoilOne.input = tempReal;
    regulatorTempSoilOne.getResultTimer();
    powerTask = regulatorTempSoilOne.output;
    }
  else{
    powerTask = taskDevice.powerHeatingMatOneTask / 100 * maxPower;
  }
  analogWrite(pwmForTempSoilOneNumber,powerTask);
  paramDevice.powerHeatingMatRealOne = powerTask*100/maxPower;
  paramClimate.temperatureSoilRealOne = tempReal;
}

void tempSoilConturRegTwo(){
  const double tempReal = getDataFromSensorModbus(sensorSoilTwoRSNumber,0x0001);
  const double tempTask = taskClimate.temperatureSoilTaskTwo;
  const String mode = taskMode.modeTempSoilTwo;
  double powerTask;
  if(mode == "Автоматический"){
    regulatorTempSoilTwo.setpoint = tempTask;
    regulatorTempSoilTwo.input = tempReal;
    regulatorTempSoilTwo.getResultTimer();
    powerTask = regulatorTempSoilTwo.output;
    }
  else{
    powerTask = taskDevice.powerHeatingMatTwoTask / 100 * maxPower;
  }
  analogWrite(pwmForTempSoilTwoNumber,powerTask);
  paramDevice.powerHeatingMatRealTwo = powerTask*100/maxPower;
  paramClimate.temperatureSoilRealTwo = tempReal;
}

void tempSoilConturRegThree(){
  double powerTask;
  const double tempReal = getDataFromSensorModbus(sensorSoilThreeRSNumber,0x0001);
  const double tempTask = taskClimate.temperatureSoilTaskThree;
  const String mode = taskMode.modeTempSoilThree;
  if(mode == "Автоматический"){
    regulatorTempSoilThree.setpoint = tempTask;
    regulatorTempSoilThree.input = tempReal;
    regulatorTempSoilThree.getResultTimer();
    powerTask = regulatorTempSoilThree.output;
    }
  else{
    powerTask = taskDevice.powerHeatingMatThreeTask / 100 * maxPower;
  }
  analogWrite(pwmForTempSoilThreeNumber,powerTask);
  paramDevice.powerHeatingMatRealThree = powerTask*100/maxPower;
  paramClimate.temperatureSoilRealThree = tempReal;
}

void humidityAirConturReg(){
  double data[3];
  data[0] = getDataFromSensorModbus(sensorAirOneRSNumber,0x0001);
  data[1] = getDataFromSensorModbus(sensorAirTwoRSNumber,0x0001);
  data[2] = getDataFromSensorModbus(sensorAirThreeRSNumber,0x0001);
  const double humidityAirReal = getAverageDataFromSensors(data,15.0);
  const double waterLVLReal = getDataFromWaterLVLSensor(sensorWaterLevelOneANumber,0.5);
  const double humidityAirTaskLow = taskClimate.humidityAirLowTask;
  const double humidityAirTaskHigh = taskClimate.humidityAirHighTask;
  const String generatorStatus = paramDevice.workStatusGeneratorHumidityAirReal;
  const String ventilatorStatus = paramDevice.workStatusVentilatorHumidityAirReal;
  const String mode = taskMode.modeHumidityAir;
 const String modea = "Автоматический";
  bool a = (mode == modea);
  Serial.println(a);
  if(mode == "Автоматический"){
    if((waterLVLReal < waterLVLMin) || (humidityAirReal > humidityAirTaskHigh)){
      if(generatorStatus == "ВКЛ"){
        digitalWrite(generatorHumidityNumber,LOW);
        generatorStatus = "ВЫКЛ";
      }
      if(ventilatorStatus == "ВКЛ"){
        digitalWrite(ventilatorHumidityNumber,LOW);
        ventilatorStatus = "ВЫКЛ";
      }
    }
    else{
      if(humidityAirTaskLow > humidityAirReal){
        if(ventilatorStatus != "ВКЛ"){
          digitalWrite(ventilatorHumidityNumber,HIGH);
          ventilatorStatus = "ВКЛ";
        }
        if(generatorStatus != "ВКЛ"){
          digitalWrite(generatorHumidityNumber,HIGH);
          generatorStatus = "ВКЛ";
        }
      }
  }}
  else{
    const String generatorTask = taskDevice.workStatusGeneratorHumidityAirTask;
    const String ventilatorTask = taskDevice.workStatusVentilatorHumidityAirTask;
    if(generatorTask == "ВКЛ" && generatorStatus != "ВКЛ"){
      digitalWrite(generatorHumidityNumber,HIGH);
      generatorStatus = "ВКЛ";
      }
    if(generatorTask == "ВЫКЛ" && generatorStatus != "ВЫКЛ"){
      digitalWrite(generatorHumidityNumber,LOW);
      generatorStatus = "ВЫКЛ";
    }
    if(ventilatorTask == "ВКЛ" && ventilatorStatus != "ВКЛ"){
      digitalWrite(ventilatorHumidityNumber,HIGH);
      ventilatorStatus = "ВКЛ";
    }
    if(ventilatorTask == "ВЫКЛ" && ventilatorStatus != "ВЫКЛ"){
      digitalWrite(ventilatorHumidityNumber,LOW);
      ventilatorStatus = "ВЫКЛ";
    }
    }
  paramDevice.workStatusGeneratorHumidityAirReal=generatorStatus;
  paramDevice.workStatusVentilatorHumidityAirReal=ventilatorStatus;
  paramClimate.humidityAirReal=humidityAirReal;
  paramClimate.waterTankLevelHumidityAirReal=waterLVLReal;
}

void humiditySoilConturRegOne(){
  const double humiditySoilReal = getDataFromSensorModbus(sensorSoilOneRSNumber,0x0000);
  const double waterLVLReal = getDataFromWaterLVLSensor(sensorWaterLevelTwoANumber,2);
  const double humiditySoilTaskLow = taskClimate.humiditySoilLowTaskOne;
  const double humiditySoilTaskHigh = taskClimate.humiditySoilHighTaskOne;
  const String flapStatus = paramDevice.workStatusFlapHumiditySoilRealOne;
  const String pumpStatus = paramDevice.workStatusPumpHumiditySoilRealOne;
  const String mode = taskMode.modeHumiditySoilOne;
  if(mode == "Автоматический"){
    if((waterLVLReal < waterLVLMin) || (humiditySoilReal > humiditySoilTaskHigh)){
      if(pumpStatus == "ВКЛ"){
        digitalWrite(pumpOneNumber,LOW);
        pumpStatus = "ВЫКЛ";
      }
      if(flapStatus == "ВКЛ"){
        digitalWrite(flapPolivOneNumber,LOW);
        flapStatus = "ВЫКЛ";
      }
    }
    else{
      if(humiditySoilTaskLow > humiditySoilReal){
        if(flapStatus != "ВКЛ"){
          digitalWrite(flapPolivOneNumber,HIGH);
          flapStatus = "ВКЛ";
        }
        if(pumpStatus != "ВКЛ"){
          digitalWrite(pumpOneNumber,HIGH);
          pumpStatus = "ВКЛ";
        }
      }
  }}
  else{
    const String pumpTask = taskDevice.workStatusPumpHumiditySoilTaskOne;
    const String flapTask = taskDevice.workStatusFlapHumiditySoilTaskOne;
    if(pumpTask == "ВКЛ" && pumpStatus != "ВКЛ"){
      digitalWrite(pumpOneNumber,HIGH);
      pumpStatus = "ВКЛ";
      }
    if(pumpTask == "ВЫКЛ" && pumpStatus != "ВЫКЛ"){
      digitalWrite(pumpOneNumber,LOW);
      pumpStatus = "ВЫКЛ";
    }
    if(flapTask == "ВКЛ" && flapStatus != "ВКЛ"){
      digitalWrite(flapPolivOneNumber,HIGH);
      flapStatus = "ВКЛ";
    }
    if(flapTask == "ВЫКЛ" && flapStatus != "ВЫКЛ"){
      digitalWrite(flapPolivOneNumber,LOW);
      flapStatus = "ВЫКЛ";}
    }
  paramDevice.workStatusPumpHumiditySoilRealOne=pumpStatus;
  paramDevice.workStatusFlapHumiditySoilRealOne=flapStatus;
  paramClimate.humiditySoilRealOne =humiditySoilReal;
  paramClimate.waterTankLevelHumiditySoilReal = waterLVLReal;
}

void humiditySoilConturRegTwo(){
  const double humiditySoilReal = getDataFromSensorModbus(sensorSoilTwoRSNumber,0x0000);
  const double waterLVLReal = getDataFromWaterLVLSensor(sensorWaterLevelTwoANumber,2);
  const double humiditySoilTaskLow = taskClimate.humiditySoilLowTaskTwo;
  const double humiditySoilTaskHigh = taskClimate.humiditySoilHighTaskTwo;
  const String flapStatus = paramDevice.workStatusFlapHumiditySoilRealTwo;
  const String pumpStatus = paramDevice.workStatusPumpHumiditySoilRealTwo;
  const String mode = taskMode.modeHumiditySoilTwo;
  if(mode == "Автоматический"){
    if((waterLVLReal < waterLVLMin) || (humiditySoilReal > humiditySoilTaskHigh)){
      if(pumpStatus == "ВКЛ"){
        digitalWrite(pumpTwoNumber,LOW);
        pumpStatus = "ВЫКЛ";
      }
      if(flapStatus == "ВКЛ"){
        digitalWrite(flapPolivTwoNumber,LOW);
        flapStatus = "ВЫКЛ";
      }
    }
    else{
      if(humiditySoilTaskLow > humiditySoilReal){
        if(flapStatus != "ВКЛ"){
          digitalWrite(flapPolivTwoNumber,HIGH);
          flapStatus = "ВКЛ";
        }
        if(pumpStatus != "ВКЛ"){
          digitalWrite(pumpTwoNumber,HIGH);
          pumpStatus = "ВКЛ";
        }
      }
  }}
  else{
    const String pumpTask = taskDevice.workStatusPumpHumiditySoilTaskTwo;
    const String flapTask = taskDevice.workStatusFlapHumiditySoilTaskTwo;
    if(pumpTask == "ВКЛ" && pumpStatus != "ВКЛ"){
      digitalWrite(pumpTwoNumber,HIGH);
      pumpStatus = "ВКЛ";
      }
    if(pumpTask == "ВЫКЛ" && pumpStatus != "ВЫКЛ"){
      digitalWrite(pumpTwoNumber,LOW);
      pumpStatus = "ВЫКЛ";
    }
    if(flapTask == "ВКЛ" && flapStatus != "ВКЛ"){
      digitalWrite(flapPolivTwoNumber,HIGH);
      flapStatus = "ВКЛ";
    }
    if(flapTask == "ВЫКЛ" && flapStatus != "ВЫКЛ"){
      digitalWrite(flapPolivTwoNumber,LOW);
      flapStatus = "ВЫКЛ";}
    }
  paramDevice.workStatusPumpHumiditySoilRealTwo=(pumpStatus);
  paramDevice.workStatusFlapHumiditySoilRealTwo=(flapStatus);
  paramClimate.humiditySoilRealTwo=(humiditySoilReal);
  paramClimate.waterTankLevelHumiditySoilReal=(waterLVLReal);
}

void humiditySoilConturRegThree(){
  const double humiditySoilReal = getDataFromSensorModbus(sensorSoilThreeRSNumber,0x0000);
  const double waterLVLReal =  getDataFromWaterLVLSensor(sensorWaterLevelTwoANumber,2);
  const double humiditySoilTaskLow = taskClimate.humiditySoilLowTaskThree;
  const double humiditySoilTaskHigh = taskClimate.humiditySoilHighTaskThree;
  const String flapStatus = paramDevice.workStatusFlapHumiditySoilRealThree;
  const String pumpStatus = paramDevice.workStatusPumpHumiditySoilRealThree;
  const String mode = taskMode.modeHumiditySoilThree;
  if(mode == "Автоматический"){
    if((waterLVLReal < waterLVLMin) || (humiditySoilReal > humiditySoilTaskHigh)){
      if(pumpStatus == "ВКЛ"){
        digitalWrite(pumpThreeNumber,LOW);
        pumpStatus = "ВЫКЛ";
      }
      if(flapStatus == "ВКЛ"){
        digitalWrite(flapPolivThreeNumber,LOW);
        flapStatus = "ВЫКЛ";
      }
    }
    else{
      if(humiditySoilTaskLow > humiditySoilReal){
        if(flapStatus != "ВКЛ"){
          digitalWrite(flapPolivThreeNumber,HIGH);
          flapStatus = "ВКЛ";
        }
        if(pumpStatus != "ВКЛ"){
          digitalWrite(pumpThreeNumber,HIGH);
          pumpStatus = "ВКЛ";
        }
      }
  }}
  else{
    const String pumpTask = taskDevice.workStatusPumpHumiditySoilTaskThree;
    const String flapTask = taskDevice.workStatusFlapHumiditySoilTaskThree;
    if(pumpTask == "ВКЛ" && pumpStatus != "ВКЛ"){
      digitalWrite(pumpThreeNumber,HIGH);
      pumpStatus = "ВКЛ";
      }
    if(pumpTask == "ВЫКЛ" && pumpStatus != "ВЫКЛ"){
      digitalWrite(pumpThreeNumber,LOW);
      pumpStatus = "ВЫКЛ";
    }
    if(flapTask == "ВКЛ" && flapStatus != "ВКЛ"){
      digitalWrite(flapPolivThreeNumber,HIGH);
      flapStatus = "ВКЛ";
    }
    if(flapTask == "ВЫКЛ" && flapStatus != "ВЫКЛ"){
      digitalWrite(flapPolivThreeNumber,LOW);
      flapStatus = "ВЫКЛ";}
    }
  paramDevice.workStatusPumpHumiditySoilRealThree=(pumpStatus);
  paramDevice.workStatusFlapHumiditySoilRealThree=(flapStatus);
  paramClimate.humiditySoilRealThree=(humiditySoilReal);
  paramClimate.waterTankLevelHumiditySoilReal=(waterLVLReal);
}

void lightConturReg(){
  double data[3];
  data[0] = getDataFromSensorModbusTwo(sensorLightOneRSNumber,0x0000);
  data[1] = getDataFromSensorModbusTwo(sensorLightTwoRSNumber,0x0000);
  data[2] = getDataFromSensorModbusTwo(sensorLightThreeRSNumber,0x0000);
  const int lightReal = getAverageDataFromINTSensors(data, 100);
  const int lightTask = taskClimate.whiteLightTask;
  const String startLightTime = taskClimate.startLight;
  const String endLightTime  = taskClimate.endLight;
  const String mode = taskMode.modeLight;
  double powerTask = 0;
  if(mode == "Автоматический"){
    if(!chechTime()){
      powerTask = 0.0;
    }
    else{
    regulatorLight.setpoint = lightTask;
    regulatorLight.input = lightReal;
    regulatorLight.getResultTimer();
    powerTask = regulatorLight.output;}
  }
  else{
    powerTask = taskDevice.whiteLightPowerTask / 100 * maxPower;
  }
  double powerReal = powerTask * 100 / maxPower;
  for(int i = 0; i < numChannels; i++){
    megaD16Pwm.setPWM(activeChannelsLight[i],0,powerTask);
  }
  paramDevice.whiteLightPowerReal=(powerReal);
  paramClimate.whiteLightReal=(lightReal);
}

void CO2ConturReg(){
  double data[3];
  data[0] = getDataFromSensorModbusTwo(sensorCO2OneRSNumber,0x0000);
  data[1] = getDataFromSensorModbusTwo(sensorCO2TwoRSNumber,0x0000);
  data[2] = getDataFromSensorModbusTwo(sensorCO2ThreeRSNumber,0x0000);
  const int CO2Real = getAverageDataFromINTSensors(data,75);
  const double powerVentilation = paramDevice.powerVentilatorInReal;
  const int lightTaskForCO2 = taskClimate.whiteLightTaskForCO2;
  data[0] = getDataFromSensorModbusTwo(sensorLightOneRSNumber,0x0000);
  data[1] = getDataFromSensorModbusTwo(sensorLightTwoRSNumber,0x0000);
  data[2] = getDataFromSensorModbusTwo(sensorLightThreeRSNumber,0x0000);
  const int lightReal = getAverageDataFromINTSensors(data, 100);
  const int  CO2TaskHigh = taskClimate.carbonDioxideHighTask;
  const int CO2TaskLow = taskClimate.carbonDioxideLowTask;
  const String flapStatus = paramDevice.workStatusFlapCO2Real;
  const double CO2TankLVL = getDataFromCO2PASensor();
  const String mode = taskMode.modeCarbonDioxide;
  if(mode == "Автоматический"){
    if((lightReal < lightTaskForCO2) || (CO2Real > CO2TaskHigh) || (powerVentilation > 30)){
      if(flapStatus == "ВКЛ"){
        digitalWrite(flapCO2Number,LOW);
        flapStatus = "ВЫКЛ";
      }
    }
    else{
      if(CO2TaskLow > CO2Real){
        if(flapStatus != "ВКЛ"){
          digitalWrite(flapCO2Number,HIGH);
          flapStatus = "ВКЛ";
        }
      }
  }}
  else{
    const String flapTask = taskDevice.workStatusFlapCO2Task;
    if(flapTask == "ВКЛ" && flapStatus != "ВКЛ"){
      digitalWrite(flapCO2Number,HIGH);
      flapStatus = "ВКЛ";
      }
    if(flapTask == "ВЫКЛ" && flapStatus != "ВЫКЛ"){
      digitalWrite(flapCO2Number,LOW);
      flapStatus = "ВЫКЛ";
    }
    }
  paramClimate.carbonDioxideTankLevelReal= CO2TankLVL ;
  paramDevice.workStatusFlapCO2Real = flapStatus;
  paramClimate.carbonDioxideReal= CO2Real;
  paramClimate.carbonDioxideTankLevelReal = CO2TankLVL;
}

void VentilationReg(){

  double newTaskVentilation;
  double newTaskVentilationFlap;

  double data[3];
  data[0] = getDataFromSensorModbusTwo(sensorCO2OneRSNumber,0x0000);
  data[1] = getDataFromSensorModbusTwo(sensorCO2TwoRSNumber,0x0000);
  data[2] = getDataFromSensorModbusTwo(sensorCO2ThreeRSNumber,0x0000);
  const int CO2Real = (int)getAverageDataFromINTSensors(data,75);
  const int CO2Street = getDataFromSensorModbusTwo(sensorCO2StreetRSNumber,0x0000);
  const int CO2Task = taskClimate.carbonDioxideHighTask;

  data[0] = getDataFromSensorModbus(sensorAirOneRSNumber,0x0000);
  data[1] = getDataFromSensorModbus(sensorAirTwoRSNumber,0x0000);
  data[2] = getDataFromSensorModbus(sensorAirThreeRSNumber,0x0000);
  const double tempReal = getAverageDataFromSensors(data,2.0);
  const double tempStreet = getDataFromSensorModbus(sensorAirStreetRSNumber,0x0000);
  const double tempTask = taskClimate.temperatureAirTask;

  data[0] = getDataFromSensorModbus(sensorAirOneRSNumber,0x0001);
  data[1] = getDataFromSensorModbus(sensorAirTwoRSNumber,0x0001);
  data[2] = getDataFromSensorModbus(sensorAirThreeRSNumber,0x0001);
  const double humidityReal = getAverageDataFromSensors(data,15.0);
  const double humidityStreet = getDataFromSensorModbus(sensorAirStreetRSNumber,0x0001);
  const double humidityTask = taskClimate.humidityAirHighTask;
  double tOtkl = 0.0;
  double hOtkl = 0.0;
  double cOtkl = 0.0;
  const String mode = taskMode.modeVentilation;
  if(mode == "Автоматический"){
    if(tempReal!=99999.0 && tempStreet!=99999.0 && (tempReal-tempTask > 1.5) && (tempReal - tempStreet > 1.5)){
      double tOtkl = (tempReal - tempTask)/tempTask*100*((tempReal-tempStreet)/(tempReal-tempTask));}
    if(humidityReal!=99999.0 && humidityStreet!=99999.0 && (humidityReal-humidityTask > 5) && (humidityReal - humidityStreet > 5)){
      double hOtkl = (humidityReal - humidityTask)/humidityTask*100*((humidityReal-humidityStreet)/(humidityReal-humidityTask));}
    if(CO2Real!=99999 && CO2Street!=99999 && (CO2Real-CO2Task > 40) && (CO2Real - CO2Street > 40)){
      double cOtkl = (CO2Real - CO2Task)/CO2Task*100*((CO2Real-CO2Street)/(CO2Real-CO2Task));}
    double otkl = max(tOtkl,max(hOtkl/4,cOtkl/40));
    regulatorVentilation.input = otkl;
    regulatorVentilationClap.input = otkl;
    newTaskVentilation = regulatorVentilation.getResultTimer();
    newTaskVentilationFlap = regulatorVentilationClap.getResultTimer();
    }
  else{
    newTaskVentilation = taskDevice.powerVentilatorInTask / 100 * 53;
    newTaskVentilationFlap = taskDevice.powerFlapOutTask / 100 * 4096;
    }
    paramDevice.powerVentilatorInReal=(newTaskVentilation * 100 / 53);
    paramDevice.powerFlapOutReal=(newTaskVentilationFlap * 100 / 4096);
    megaD16Pwm.setPWM(13,0,newTaskVentilationFlap);
    megaD16Pwm.setPWM(14,0,newTaskVentilationFlap);
    analogWrite(pwmForVentilatorVentilationNumber,newTaskVentilation);
}


void setup() {

connectEthernet();

  pinMode(sensorWaterLevelOneANumber,INPUT);
  pinMode(sensorWaterLevelTwoANumber,INPUT);

  pinMode(pumpOneNumber,OUTPUT);
  pinMode(pumpTwoNumber,OUTPUT);
  pinMode(pumpThreeNumber ,OUTPUT);
  pinMode(flapPolivOneNumber ,OUTPUT);
  pinMode(flapPolivTwoNumber ,OUTPUT);
  pinMode(flapPolivThreeNumber ,OUTPUT);
  pinMode(flapCO2Number ,OUTPUT);
  pinMode(generatorHumidityNumber ,OUTPUT);
  pinMode(ventilatorHumidityNumber ,OUTPUT);

  pinMode(pwmForTempSoilOneNumber ,OUTPUT);
  pinMode(pwmForTempSoilOneNumber ,OUTPUT);
  pinMode(pwmForTempSoilOneNumber ,OUTPUT);
  pinMode(pwmForTempAirNumberOne ,OUTPUT);
  pinMode(pwmForTempAirNumberTwo ,OUTPUT);
  pinMode(pwmForVentilatorVentilationNumber ,OUTPUT);
  pinMode(pwmForVentilationFlapNumber ,OUTPUT);



  regulatorLight.setDirection(NORMAL);
  regulatorLight.setLimits(0, 3412.5);

  regulatorTempAir.setDirection(NORMAL);
  regulatorTempAir.setLimits(0, 53);

  regulatorTempSoilOne.setDirection(NORMAL);
  regulatorTempSoilOne.setLimits(0, 53);

  regulatorTempSoilTwo.setDirection(NORMAL);
  regulatorTempSoilTwo.setLimits(0, 53);

  regulatorTempSoilThree.setDirection(NORMAL);
  regulatorTempSoilThree.setLimits(0, 53);

  regulatorVentilation.setDirection(NORMAL);
  regulatorVentilation.setLimits(0, 3412.5);
  regulatorVentilation.setpoint = 5;

  regulatorVentilationClap.setDirection(NORMAL);
  regulatorVentilationClap.setLimits(0, 4096.0);
  regulatorVentilationClap.setpoint = 5;
  megaD16Pwm.begin();
  megaD16Pwm.setPWMFreq(1000);

  scale.begin(sensorMCO2NumberFirstPin,sensorMCO2NumberSecondPin);
  Serial1.begin(9600);

}


void loop() {

  if(chechEthernet()){
    getDataFromServer();
  }

  tempAirConturReg();
  tempSoilConturRegOne();
  tempSoilConturRegTwo();
  tempSoilConturRegThree();
  humidityAirConturReg();
  humiditySoilConturRegOne();
  humiditySoilConturRegTwo();
  humiditySoilConturRegThree();
  lightConturReg();
  CO2ConturReg();
  VentilationReg();

  if(chechEthernet()){
    sendRealParamClimate();
    sendRealParamDevice();
  }
}