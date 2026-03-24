import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCardComponent } from './event-card.component';

describe('EventCardComponent', () => {
  let component: EventCardComponent;
  let fixture: ComponentFixture<EventCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventCardComponent]
    });
    fixture = TestBed.createComponent(EventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(EventCardComponent);
  const component = fixture.componentInstance;

  component.event = {
    id: 1,
    title: 'Open Mic Night',
    description: 'A fun event',
    date: '2026-03-20',
    location: 'Atlanta'
  } as any;

  fixture.detectChanges();

  expect(component).toBeTruthy();
  });
});
