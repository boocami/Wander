import { stringify } from '@angular/compiler/src/util';
import { Component, ViewChild, Output, EventEmitter, ElementRef, ViewEncapsulation, AfterViewInit, QueryList, Renderer2 } from '@angular/core';
import { ColorsService } from '../../../Servicios/colors.service';
import * as L from 'leaflet';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { WeatherService } from '../../../Servicios/weather.service';
import { GeolocationService } from '../../../Servicios/geolocation.service';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HeaderComponent implements AfterViewInit {

  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];

  pais: string = "";
  comuna: string;
  coords: any;
  latLong: any;
  location: any;
  weather: any = undefined;
  temperatura: number;
  descriptionTemperatura: string;

  

  @ViewChild('canvas') canvas: ElementRef;
  _canvas: any;
  ctx: CanvasRenderingContext2D;

  @ViewChild('canvasval') canvasval: ElementRef;
  @ViewChild('texto') texto;
  @ViewChild('texto1') texto1;
  @ViewChild('texto2') texto2;

  url: any = "../../../../assets/Valparaiso-sernatur-DST141.jpg";
  _ctx: CanvasRenderingContext2D;
  _img: any;
  _colbox: any;
  _hexval: any;
  _rgbaval: any;
  width: number;
  hight: number;
  colorPrimario: string;


  httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*',
    })
  };

  constructor(private httpClient: HttpClient,  public geo: GeolocationService, public weatherService: WeatherService, public color: ColorsService, private element: ElementRef, private renderer: Renderer2) { }
  ngOnInit(): void {
  
    
    if (!navigator.geolocation) {
      console.log('location is not supported');
    }
    navigator.geolocation.getCurrentPosition((position) => {
      this.coords = position.coords;
      this.latLong = [this.coords.latitude, this.coords.longitude];
      this.geo.getdatos(this.coords.latitude, this.coords.longitude).subscribe((res: any) => {
        console.log("aqui");
        console.log(res);
        this.comuna = res.address.city;
        this.pais = res.address.country;
        let postcode = res.address.postcode;
        this.weatherService.getWeather(this.coords.latitude, this.coords.longitude).subscribe(resultado => {
          console.log(resultado);
          this.weather = resultado;
          this.temperatura = this.weatherService.KelvintoCelsius(this.weather.main.temp);
          this.descriptionTemperatura = this.weather.weather[0].main;
          console.log(this.descriptionTemperatura);
        },
          err => {
            console.log(err);
          });
      });
    });


  }
  ngAfterViewInit(): void {
    
    setTimeout(() => {
      console.log(this.canvas.nativeElement.innerText);
    }, 1000);
    this.cargarimagen();
    setTimeout(() => {
      this.colorPrimario = this.color.mostFrequent(this.color.getPixel(this.width, this.hight, this._ctx));
      this.colorPrimario = this.colorPrimario[0];
    }, 4000);
    let tex = this.texto.nativeElement;
    let tex1 = this.texto1.nativeElement;
    let tex2 = this.texto2.nativeElement;

   

  }


  //GetPixeles mediante evento
  getPixeles(event) {
    var boundingRect = this._canvas.getBoundingClientRect();
    var x = event.clientX - boundingRect.left;
    var y = event.clientY - boundingRect.top;
    var px = this._ctx.getImageData(x, y, 1, 1);
    var data_array = px.data;
    var pixelColor =
      "rgba(" +
      data_array[0] +
      "," +
      data_array[1] +
      "," +
      data_array[2] +
      "," +
      data_array[3] +
      ")";
    this._rgbaval = pixelColor;
    var dColor = data_array[2] + 256 * data_array[1] + 65536 * data_array[0];
    this._hexval = "#" + dColor.toString(16);

  }

  cargarimagen() {
    this._img = new Image();
    this._img.src = this.url;
    this.width = 300;
    this.hight = 227;
    this._img = document.createElement("img");
    this._img.crossOrigin = 'anonymous';
    this._img.src = this.url;
    this._canvas = this.canvas.nativeElement;
    this._ctx = this._canvas.getContext("2d");
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    this._img.onload = (() =>
      this._ctx.drawImage(this._img, 0, 0, this._img.width, this._img.height, 0, 0, this._canvas.width, this._canvas.height));
  }


}