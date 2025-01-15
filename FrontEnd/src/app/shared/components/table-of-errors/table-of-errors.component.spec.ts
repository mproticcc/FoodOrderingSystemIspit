import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOfErrorsComponent } from './table-of-errors.component';

describe('TableOfErrorsComponent', () => {
  let component: TableOfErrorsComponent;
  let fixture: ComponentFixture<TableOfErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableOfErrorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableOfErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
