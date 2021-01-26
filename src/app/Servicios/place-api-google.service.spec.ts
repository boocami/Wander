import { TestBed } from '@angular/core/testing';

import { PlaceAPIGoogleService } from './place-api-google.service';

describe('PlaceAPIGoogleService', () => {
  let service: PlaceAPIGoogleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaceAPIGoogleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
