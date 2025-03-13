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

DHT dht22(DHT22_PIN, DHT11);

const char* linkForSendRealClimate = "https://seyrelf.tech/realParamClimate/create";
const char* linkForSendRealDevice = "https://seyrelf.tech/realDeviceClimate/update";
const char* linkForGetAllMode = "https://seyrelf.tech/mode/getLast";
const char* linkForGetTaskClimate = "https://seyrelf.tech/settingsClimate/getLast";
const char* linkForGetTaskDevice = "https://seyrelf.tech/settingsDevice/getLast";

const char* ssid = "RT-GPON-3DB0";
const char* password = "Aaeia4bahf";
WiFiClientSecure *client = new WiFiClientSecure;
HTTPClient http;
const char* host = "seyrelf.tech";


void getDataFromServer(String link){
    http.begin(*client,link);
    int httpResponseCode = http.GET();
    if (httpResponseCode > 0) {
          String payload = http.getString(); // Получаем ответ от сервера
          Serial.println("Ответ сервера: " + payload);

          // Парсим JSON-ответ
          StaticJsonDocument<200> doc; // Размер документа зависит от размера JSON
          DeserializationError error = deserializeJson(doc, payload);
}


void sendDataToServer(String link,String data){
    http.begin(*client,link);
    http.addHeader("Content-Type", "application/json");
    http.addHeader("Authorization", "Basic d29ya2VyOjAxMDgwMg==");
       if (http.POST(data) > 0) { //Проверьте код возврата
          }
       else{
          Serial.println("error send data to server!");
          }
}

void setup() {
  client->setInsecure();
  Serial.begin(115200);
  dht22.begin();
  WiFi.begin(ssid, password);
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
}}

void loop() {
  
  double damp  = dht22.readHumidity();
  double temp = dht22.readTemperature();
  double light = analogRead(analogPin);
      
  if (WiFi.status() == WL_CONNECTED) {
    getDataFromServer(linkForGetAllMode);

    delay(3000);
}
