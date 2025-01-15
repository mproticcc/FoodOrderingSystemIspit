import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersErrorsComponent } from './users-errors.component';

describe('UsersErrorsComponent', () => {
  let component: UsersErrorsComponent;
  let fixture: ComponentFixture<UsersErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersErrorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
