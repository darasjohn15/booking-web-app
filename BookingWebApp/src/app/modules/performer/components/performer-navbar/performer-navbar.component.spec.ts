import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformerNavbarComponent } from './performer-navbar.component';

describe('PerformerNavbarComponent', () => {
  let component: PerformerNavbarComponent;
  let fixture: ComponentFixture<PerformerNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerformerNavbarComponent]
    });
    fixture = TestBed.createComponent(PerformerNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
