import { TestBed } from '@angular/core/testing';

import { GeoDBService } from './geo-db.service';

describe('GeoDBService', () => {
  let service: GeoDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeoDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
