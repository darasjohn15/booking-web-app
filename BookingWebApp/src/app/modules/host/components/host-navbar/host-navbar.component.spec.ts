import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueNavbarComponent } from './host-navbar.component';

describe('VenueNavbarComponent', () => {
  let component: VenueNavbarComponent;
  let fixture: ComponentFixture<VenueNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VenueNavbarComponent]
    });
    fixture = TestBed.createComponent(VenueNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
