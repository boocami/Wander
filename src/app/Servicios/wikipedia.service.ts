import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders, HttpParams, HttpResponse  } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {

  apiKey: string = 'e30a2b750f27f2feedff6f126820c44a';
  URI: string = '';
  URIWIPI: string = '';

  constructor(private http: HttpClient, private HttpClientModule: HttpClientModule) {
    this.URI = `https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=5&gsrsearch='New_England_Patriots`;
    this.URIWIPI = `https://commons.wikimedia.org/w/api.php?action=query&pageids=69796122|69582727|51186303&prop=imageinfo`
    //api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
    //https://api.openweathermap.org/data/2.5/weather?appid=${this.apiKey}&units=metric&q=`
  }

  getDataWiki() {
    return this.http.get(this.URI);
  }

  getDataAPISandbox():Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'text/plain','Access-Control-Allow-Origin': '*'});
    return this.http.get(this.URIWIPI);
  }
}



