import { TestBed } from '@angular/core/testing';

import { CanPLaceOrderGuard } from './can-place-order.guard';

describe('CanPLaceOrderGuard', () => {
  let guard: CanPLaceOrderGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanPLaceOrderGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
