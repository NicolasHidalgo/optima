import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsProjectsComponent } from './appointments-projects.component';

describe('AppointmentsProjectsComponent', () => {
  let component: AppointmentsProjectsComponent;
  let fixture: ComponentFixture<AppointmentsProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentsProjectsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointmentsProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
