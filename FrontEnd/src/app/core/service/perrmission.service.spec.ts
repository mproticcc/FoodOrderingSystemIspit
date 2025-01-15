import { TestBed } from '@angular/core/testing';

import { PerrmissionService } from './perrmission.service';

describe('PerrmissionService', () => {
  let service: PerrmissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerrmissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
