import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelOfUsersComponent } from './tabel-of-users.component';

describe('TabelOfUsersComponent', () => {
  let component: TabelOfUsersComponent;
  let fixture: ComponentFixture<TabelOfUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelOfUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelOfUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
