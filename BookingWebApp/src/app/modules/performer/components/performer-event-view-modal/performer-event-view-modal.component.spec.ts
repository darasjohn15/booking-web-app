import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PerformerEventViewModalComponent } from './performer-event-view-modal.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { EventsService } from 'src/app/services/events.service';

describe('PerformerEventViewModalComponent', () => {
  let component: PerformerEventViewModalComponent;
  let fixture: ComponentFixture<PerformerEventViewModalComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthenticationService>;
  let eventsServiceSpy: jasmine.SpyObj<EventsService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthenticationService', ['getUserId']);
    eventsServiceSpy = jasmine.createSpyObj('EventsService', [
      'applyToEvent',
      'getPerformerApplications'
    ]);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    authServiceSpy.getUserId.and.returnValue('performer-123');
    eventsServiceSpy.getPerformerApplications.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [PerformerEventViewModalComponent],
      providers: [
        { provide: AuthenticationService, useValue: authServiceSpy },
        { provide: EventsService, useValue: eventsServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PerformerEventViewModalComponent);
    component = fixture.componentInstance;

    component.event = {
      id: 'event-1',
      title: 'Open Mic Night'
    };
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should set performerID and load applications on init', () => {
    spyOn(component, 'loadPerformerApplications');

    fixture.detectChanges();

    expect(authServiceSpy.getUserId).toHaveBeenCalled();
    expect(component.performerID).toBe('performer-123');
    expect(component.loadPerformerApplications).toHaveBeenCalled();
  });

  it('should apply to event successfully and show success snackbar', () => {
    eventsServiceSpy.applyToEvent.and.returnValue(of({}));

    component.performerID = 'performer-123';
    component.event = { id: 'event-1' };

    component.applyToEvent();

    expect(eventsServiceSpy.applyToEvent).toHaveBeenCalledWith({
      eventID: 'event-1',
      performerID: 'performer-123'
    });
    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'Applied successfully!',
      'Close',
      { duration: 3000 }
    );
  });

  it('should show error snackbar when applyToEvent fails', () => {
    eventsServiceSpy.applyToEvent.and.returnValue(
      throwError(() => new Error('apply failed'))
    );

    component.performerID = 'performer-123';
    component.event = { id: 'event-1' };

    component.applyToEvent();

    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'Failed to apply. Try again.',
      'Close',
      { duration: 3000 }
    );
  });

  it('should load performer applications and enable apply button when no matching application exists', () => {
    const applications = [{ eventId: 'event-2' }];
    eventsServiceSpy.getPerformerApplications.and.returnValue(of(applications));

    component.performerID = 'performer-123';
    component.event = { id: 'event-1' };

    component.loadPerformerApplications();

    expect(eventsServiceSpy.getPerformerApplications).toHaveBeenCalledWith('performer-123');
    expect(component.performerApplications).toEqual(applications);
    expect(component.isDisabled).toBeFalse();
  });

  it('should load performer applications and disable apply button when matching application exists', () => {
    const applications = [{ eventId: 'event-1' }, { eventId: 'event-2' }];
    eventsServiceSpy.getPerformerApplications.and.returnValue(of(applications));

    component.performerID = 'performer-123';
    component.event = { id: 'event-1' };

    component.loadPerformerApplications();

    expect(component.performerApplications).toEqual(applications);
    expect(component.isDisabled).toBeTrue();
  });

  it('should return true from disableApplyButton when application matches event id', () => {
    component.event = { id: 'event-1' };

    const result = component.disableApplyButton([
      { event_id: 'event-9' },
      { event_id: 'event-1' }
    ]);

    expect(result).toBeTrue();
  });

  it('should return false from disableApplyButton when no application matches event id', () => {
    component.event = { id: 'event-1' };

    const result = component.disableApplyButton([
      { event_id: 'event-9' },
      { event_id: 'event-2' }
    ]);

    expect(result).toBeFalse();
  });

  it('should keep existing state when loadPerformerApplications errors', () => {
    eventsServiceSpy.getPerformerApplications.and.returnValue(
      throwError(() => new Error('load failed'))
    );

    component.performerApplications = [];
    component.isDisabled = false;
    component.performerID = 'performer-123';
    component.event = { id: 'event-1' };

    component.loadPerformerApplications();

    expect(component.performerApplications).toEqual([]);
    expect(component.isDisabled).toBeFalse();
  });
});