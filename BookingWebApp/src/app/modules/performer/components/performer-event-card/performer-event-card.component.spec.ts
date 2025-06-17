import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformerEventCardComponent } from './performer-event-card.component';

describe('PerformerEventCardComponent', () => {
  let component: PerformerEventCardComponent;
  let fixture: ComponentFixture<PerformerEventCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerformerEventCardComponent]
    });
    fixture = TestBed.createComponent(PerformerEventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
