import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  
  apiKey: string = 'pk.cd2e38cebed987500e6ba002cde568ff';
  URI: string = '';

  constructor(private http: HttpClient) {
    this.URI = `https://us1.locationiq.com/v1/reverse.php?key=${this.apiKey}`;
   }
   getdatos(latitude:string, longitude:string){
      return  this.http.get(this.URI +'&lat=' + latitude + "&lon=" + longitude + "&format=json");
   }
}
