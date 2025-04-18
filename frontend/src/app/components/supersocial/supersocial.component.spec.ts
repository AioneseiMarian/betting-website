import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupersocialComponent } from './supersocial.component';

describe('SupersocialComponent', () => {
  let component: SupersocialComponent;
  let fixture: ComponentFixture<SupersocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupersocialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupersocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
