import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class ColorsService {
  width: number;
  higth: number;
  arrayOpcion: string[] = new Array();

  constructor() { }

  getPixel(imgwidth, imghigth, _ctx) {
    this.width = imgwidth;
    this.higth = imghigth;
    var x;
    var i;
    for (x = 0; x <= 299; x++) {
      for (i =0; i <= 60; i++) {
        var px = _ctx.getImageData(x, i, 1, 1).data;
        var data_array = px;
        var pixelColor = "rgba(" + data_array[0] + "," + data_array[1] + "," + data_array[2] + "," + data_array[3] + ")";
        var dColor = data_array[2] + 256 * data_array[1] + 65536 * data_array[0];
         var _hexval=('#'+dColor.toString(16));
        this.arrayOpcion.push(_hexval);
      }
    }
    return this.arrayOpcion;
  }
  mostFrequent = data => data.reduce((r,c,i,a) => {
    r[c] = (r[c] || 0) + 1
    r.max = r[c] > r.max ? r[c] : r.max
    if(i == a.length-1) {
      r = Object.entries(r).filter(([k,v]) => v == r.max && k != 'max')
      return r.map(x => x[0])
    }
    return r
  }, {max: 0});
}

