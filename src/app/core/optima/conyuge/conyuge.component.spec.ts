import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConyugeComponent } from './conyuge.component';

describe('ConyugeComponent', () => {
  let component: ConyugeComponent;
  let fixture: ComponentFixture<ConyugeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConyugeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConyugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
