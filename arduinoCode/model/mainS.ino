#include <ArduinoJson.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include "RealParamClimate.h"
#include "RealParamDevice.h"
#include "SettingsClimate.h"
#include "SettingsDevice.h"
#include "SettingsMode.h"
#include "DHT.h"
#include <WiFiClientSecure.h>
#define analogPin A0
#define DHT22_PIN 4
const int ledPin = 5;
DHT dht22(DHT22_PIN, DHT11);

const char* linkForSendRealClimate = "https://seyrelf.tech/realParamClimate/update";
const char* linkForSendRealDevice = "https://seyrelf.tech/realDeviceClimate/update";
const char* linkForGetAllMode = "https://seyrelf.tech/mode/getLast";
const char* linkForGetTaskClimate = "https://seyrelf.tech/settingsClimate/getLast";
const char* linkForGetTaskDevice = "https://seyrelf.tech/settingsDevice/getLast";

SettingsClimate taskClimate;
SettingsDevice taskDevice;
SettingsMode taskMode;
RealParamDevice paramDevice;

const char* ssid = "RT-GPON-3DB0";
const char* password = "Aaeia4bahf";
WiFiClientSecure *client = new WiFiClientSecure;
HTTPClient http;
const char* host = "seyrelf.tech";



DynamicJsonDocument getDataFromServer(String link){
    http.begin(*client,link);
    http.addHeader("Content-Type", "application/json");
    http.addHeader("Authorization", "Basic d29ya2VyOjAxMDgwMg==");
    int httpResponseCode = http.GET();
    DynamicJsonDocument doc(1024);
    if (httpResponseCode > 0) {
          String payload = http.getString(); // Получаем ответ от сервера
          Serial.println("Ответ сервера: " + payload);
          DeserializationError error = deserializeJson(doc, payload);
}
  return doc;
}



void sendDataToServer(String link,String data){
    http.begin(*client,link);
    http.addHeader("Content-Type", "application/json");
    http.addHeader("Authorization", "Basic d29ya2VyOjAxMDgwMg==");
       if (http.PATCH(data) > 0) { //Проверьте код возврата
          }
       else{
          Serial.println("error send data to server!");
          }
}



void setup() {
  pinMode(ledPin, OUTPUT);
  client->setInsecure();
  Serial.begin(115200);
  dht22.begin();
  WiFi.begin(ssid, password);
  delay(1000);

}

void connectToWiFi() {
  Serial.println("Подключение к Wi-Fi...");
  WiFi.reconnect();
   delay(5000);
}

String getRealParamClimate(double damp,double light,double temp){
  DynamicJsonDocument doc(1024);
   doc["humidityAirReal"] = damp;
   doc["waterTankLevelHumidityAirReal"] = 98.0;
   doc["carbonDioxideReal"] = 80.0;
   doc["humiditySoilReal"] = damp;
   doc["waterTankLevelHumiditySoilReal"] = 100.0;
   doc["whiteLightReal"] = light * 4;
   doc["redLightReal"] = light;
   doc["blueLightReal"] = light;
   doc["longLightRedReal"] = light;
   doc["uvlightReal"] = light;
   doc["temperatureAirReal"] = temp;
   doc["temperatureSoilReal"] = temp; 
   String jsonString;
   serializeJson(doc,jsonString);
   return jsonString;
}


String getRealParamDevice(double damp,double light,double temp){
   DynamicJsonDocument doc(1024);
   doc["humidityAirReal"] = damp;
   doc["waterTankLevelHumidityAirReal"] = 98.0;
   doc["carbonDioxideReal"] = 80.0;
   doc["humiditySoilReal"] = damp;
   doc["waterTankLevelHumiditySoilReal"] = 100.0;
   doc["whiteLightReal"] = light * 4;
   doc["redLightReal"] = light;
   doc["blueLightReal"] = light;
   doc["longLightRedReal"] = light;
   doc["uvlightReal"] = light;
   doc["temperatureAirReal"] = temp;
   doc["temperatureSoilReal"] = temp; 
   String jsonString;
   serializeJson(doc,jsonString);
   return jsonString;
}

void updateTaskClimate(){
  DynamicJsonDocument data = getDataFromServer(linkForGetTaskClimate);
  taskClimate.updateTask(data);
}


void updateTaskDevice(){
  DynamicJsonDocument data = getDataFromServer(linkForGetTaskDevice);
  taskDevice.updateTask(data);
}

void updateTaskMode(){
  DynamicJsonDocument data = getDataFromServer(linkForGetAllMode);
  taskMode.updateTask(data);
  Serial.println(taskMode.modeTempAir);
  
}


void loop() {
  double damp  = dht22.readHumidity();
  double temp = dht22.readTemperature();
  double light = analogRead(analogPin);
  
  if (WiFi.status() == WL_CONNECTED) {
    
    getDataFromServer(linkForGetAllMode);
     DynamicJsonDocument doc(1024);
     doc["humidityAirReal"] = damp;
     doc["waterTankLevelHumidityAirReal"] = 98.0;
     doc["carbonDioxideReal"] = 80.0;
     doc["humiditySoilReal"] = damp;
     doc["waterTankLevelHumiditySoilReal"] = 100.0;
     doc["whiteLightReal"] = light * 4;
     doc["redLightReal"] = light;
     doc["blueLightReal"] = light;
     doc["longLightRedReal"] = light;
     doc["uvlightReal"] = light;
     doc["temperatureAirReal"] = temp;
     doc["temperatureSoilReal"] = temp; 
     String jsonString;
     serializeJson(doc,jsonString);
     Serial.println("Отправляемый JSON: " + jsonString);
     sendDataToServer(linkForSendRealClimate,jsonString);
     updateTaskMode();
     updateTaskClimate();
     analogWrite(ledPin, paramDevice.redLightPowerReal);
     Serial.println(taskClimate.whiteLightTask);
     Serial.println(paramDevice.redLightPowerReal);
     Serial.println(light * 4);
     if(light * 4 > taskClimate.whiteLightTask){
        paramDevice.redLightPowerReal -=5;   
     }
     else if(light * 4 < taskClimate.whiteLightTask){
        paramDevice.redLightPowerReal +=5; 
     }
     delay(3000);
     
}
  else{
    connectToWiFi();
    
  }

}
