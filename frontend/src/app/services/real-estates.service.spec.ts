import { TestBed } from '@angular/core/testing';

import { RealEstatesService } from './real-estates.service';

describe('RealEstatesService', () => {
  let service: RealEstatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealEstatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
