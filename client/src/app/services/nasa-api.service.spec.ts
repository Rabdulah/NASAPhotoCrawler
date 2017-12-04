/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NasaApiService } from './nasa-api.service';

describe('NasaApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NasaApiService]
    });
  });

  it('should ...', inject([NasaApiService], (service: NasaApiService) => {
    expect(service).toBeTruthy();
  }));
});
