import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiKey: string = 'e30a2b750f27f2feedff6f126820c44a';
  URI: string = '';

  constructor(private http: HttpClient) {
    this.URI = `https://api.openweathermap.org/data/2.5/weather?`;
    //api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
    //https://api.openweathermap.org/data/2.5/weather?appid=${this.apiKey}&units=metric&q=`
  }

  getWeather(lat: any, lon: any) {
    return this.http.get(this.URI +"lat=" + lat + "&lon=" + lon + "&appid=" +this.apiKey);
  }

  KelvintoCelsius(K){
    var defaultCelsius = 273.15;
    var celsius:number = K-defaultCelsius;
    return Math.round(celsius);
  }
}