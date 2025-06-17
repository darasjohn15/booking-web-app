import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformerComponent } from './performer.component';

describe('PerformerComponent', () => {
  let component: PerformerComponent;
  let fixture: ComponentFixture<PerformerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerformerComponent]
    });
    fixture = TestBed.createComponent(PerformerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
