import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ColorsService } from '../../Servicios/colors.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WikipediaService } from '../../Servicios/wikipedia.service';
import {GeoDBService} from '../../Servicios/geo-db.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-content-signup',
  templateUrl: './content-signup.component.html',
  styleUrls: ['./content-signup.component.css'],
  providers: [WikipediaService]
})
export class ContentSignupComponent {

  @ViewChild('canvas') canvas: ElementRef;
  _canvas: any;
  ctx: CanvasRenderingContext2D;

  @ViewChild('canvasval') canvasval: ElementRef;
  @ViewChild('texto') texto;
  @ViewChild('texto1') texto1;
  @ViewChild('texto2') texto2;

  url: any = "../../../assets/Valparaiso-sernatur-DST141.jpg";
  _ctx: CanvasRenderingContext2D;
  _img: any;
  _colbox: any;
  _hexval: any;
  _rgbaval: any;
  width: number;
  hight: number;
  colorPrimario: string;


  constructor(public color: ColorsService, private element: ElementRef, private httpClient: HttpClient, public wikipedi: WikipediaService, public geoDbService: GeoDBService) { }

  ngOnInit(): void {
        this.geoDbService.getdataCity();
        this.geoDbService.findPlacesNearLocation();
  }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
  ngAfterViewInit(): void {

    setTimeout(() => {
      console.log(this.canvas.nativeElement.innerText);
    }, 1000);
    this.cargarimagen();

    setTimeout(() => {
      this.colorPrimario = this.color.mostFrequent(this.color.getPixel(this.width, this.hight, this._ctx));
      this.colorPrimario = this.colorPrimario[0];
      console.log("el color es", this.colorPrimario);
    }, 4000);
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

