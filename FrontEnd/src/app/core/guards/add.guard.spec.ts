import { TestBed } from '@angular/core/testing';

import { AddGuard } from './add.guard';

describe('AddGuard', () => {
  let guard: AddGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AddGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
