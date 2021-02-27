#include "DHTesp.h"
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

char FirstId[] = "wifiName";
char FirstPass[] = "wifiPass";

String serverName = "http://localhost:8080/api/";
String BoardName = "NodeMCU";

DHTesp dht;

void setup() {
  Serial.begin(9600);
  Serial.println();
  String thisBoard = ARDUINO_BOARD;
  Serial.println(thisBoard);

  ConnectWiFi();
  Serial.println(WiFi.localIP());
  dht.setup(2, DHTesp::DHT11); // Connect DHT sensor to GPIO 17
}

void loop() {
  delay(dht.getMinimumSamplingPeriod());

  float humidity = dht.getHumidity();
  float temperature = dht.getTemperature();

  Serial.print(dht.getStatusString());
  Serial.print("\t");
  Serial.print(humidity, 1);
  Serial.print("\t\t");
  Serial.print(temperature, 1);
  Serial.println("\t\t");

  SendData(temperature, humidity);
  delay(30000);
}

void SendData(float temperature, float humidity) {
  HTTPClient http;

  http.begin(serverName+"insertTemperature");
  Serial.println(serverName+"insertTemperature");
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");
  String httpRequestData = "Board=" + BoardName + "&Temperature=" + temperature;
  int httpResponseCode = http.POST(httpRequestData);

  Serial.print("HTTP Response code: "); // code -11 = ok
  Serial.println(httpResponseCode);
  
  http.end();

  http.begin(serverName+"insertHumidity");
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");
  httpRequestData = "Board=" + BoardName + "&Humidity=" + humidity;
  httpResponseCode = http.POST(httpRequestData);

  Serial.print("HTTP Response code: "); // code -11 = ok
  Serial.println(httpResponseCode);
  http.end();
}

void ConnectWiFi() {
  delay(5000);
  Serial.print("Trying to connect to:");
  Serial.println(FirstId);
  WiFi.begin(FirstId, FirstPass);

  while (WiFi.status() != WL_CONNECTED) {
    if (WiFi.status() == WL_CONNECTED) {
      Serial.println("Connection succesfull");
    } else if (WiFi.status() != WL_CONNECTED) {
      Serial.print(".");
      delay(400);
    }
  }
}
