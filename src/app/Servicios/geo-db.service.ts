import { Injectable } from '@angular/core';
import {GeoDbService} from 'wft-geodb-angular-client';


import {PlaceSummary} from 'wft-geodb-angular-client/lib/model/place-summary.model';
import {GeoResponse} from 'wft-geodb-angular-client/lib/model/geo-response.model';
import {NearLocationRequest} from 'wft-geodb-angular-client/lib/request/near-location-request.model';

@Injectable({
  providedIn: 'root'
})
export class GeoDBService {

  readonly CITY_RESULTS_COLUMNS_NO_COUNTRY = [{name: 'ID'}, {name: 'City'}, {name: 'Region'}];
  readonly CITY_RESULTS_COLUMNS = [...this.CITY_RESULTS_COLUMNS_NO_COUNTRY, {name: 'Country'}];

  constructor(private geoDbService: GeoDbService) { }

  getdataCity(){
    return this.geoDbService.findPlaces({
      namePrefix: "Valparaiso",
      countryIds: ["CL"],
      minPopulation: 100000,
      types: ["CITY"],
      limit: 10,
      offset: 0
    })
    .subscribe(
      (response: GeoResponse<PlaceSummary[]>) => {
        const totalCount = response.metadata.totalCount;
        let data: PlaceSummary[] = response.data;

        console.log(data);
        // Do your thing!
      }
    );
  }
  findPlacesNearLocation(){
    const nearLocationRequest: NearLocationRequest = {
      latitude: -33.0458,
      longitude: -71.6197,
      radius: 10,
      distanceUnit: 'MI'
    };

    this.geoDbService.findPlacesNearLocation({
      location: nearLocationRequest,
      minPopulation: 50000,
          types: ["CITY"],          
          sortDirectives: [
            "-population"
          ],
          limit: 10,
          offset: 0
    }).subscribe(
      (response: GeoResponse<PlaceSummary[]>) => {
        var cityResultsTotalCount = response.metadata.totalCount;

        var cityResultsCurrent = [...response.data];
        console.log(cityResultsCurrent);
      });
  }
}
