import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BileteleMeleComponent } from './biletele-mele.component';

describe('BileteleMeleComponent', () => {
  let component: BileteleMeleComponent;
  let fixture: ComponentFixture<BileteleMeleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BileteleMeleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BileteleMeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
