import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptimaComponent } from './optima.component';

describe('OptimaComponent', () => {
  let component: OptimaComponent;
  let fixture: ComponentFixture<OptimaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptimaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OptimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
