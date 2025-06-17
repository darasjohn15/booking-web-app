import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformerEventViewModalComponent } from './performer-event-view-modal.component';

describe('PerformerEventViewModalComponent', () => {
  let component: PerformerEventViewModalComponent;
  let fixture: ComponentFixture<PerformerEventViewModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerformerEventViewModalComponent]
    });
    fixture = TestBed.createComponent(PerformerEventViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
