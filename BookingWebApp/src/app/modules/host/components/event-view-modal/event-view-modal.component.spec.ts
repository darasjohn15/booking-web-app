import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { EventViewModalComponent } from './event-view-modal.component';
import { UsersService } from 'src/app/services/user.service';

describe('EventViewModalComponent', () => {
  let component: EventViewModalComponent;
  let fixture: ComponentFixture<EventViewModalComponent>;
  let usersServiceSpy: jasmine.SpyObj<UsersService>;

  beforeEach(async () => {
    usersServiceSpy = jasmine.createSpyObj('UsersService', ['getUser']);

    await TestBed.configureTestingModule({
      declarations: [EventViewModalComponent],
      providers: [
        { provide: UsersService, useValue: usersServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EventViewModalComponent);
    component = fixture.componentInstance;

    // Safe default input before detectChanges / ngOnInit
    component.event = {
      performers: []
    };
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should not load performer names when event has no performers', () => {
    spyOn(component, 'loadPerformerNames');

    component.event = {};
    fixture.detectChanges();

    expect(component.loadPerformerNames).not.toHaveBeenCalled();
  });

  it('should call loadPerformerNames on init when performers exist', () => {
    spyOn(component, 'loadPerformerNames');

    component.event = {
      performers: ['1', '2']
    };

    fixture.detectChanges();

    expect(component.loadPerformerNames).toHaveBeenCalledWith(['1', '2']);
  });

  it('should load performer names from UsersService', () => {
    usersServiceSpy.getUser.withArgs('1').and.returnValue(of({ name: 'Razzo' }));
    usersServiceSpy.getUser.withArgs('2').and.returnValue(of({ name: 'Kai' }));

    component.loadPerformerNames(['1', '2']);

    expect(usersServiceSpy.getUser).toHaveBeenCalledWith('1');
    expect(usersServiceSpy.getUser).toHaveBeenCalledWith('2');
    expect(component.performerNames).toEqual(['Razzo', 'Kai']);
  });

  it('should ignore users without a name', () => {
    usersServiceSpy.getUser.withArgs('1').and.returnValue(of({}));
    usersServiceSpy.getUser.withArgs('2').and.returnValue(of({ name: 'Kai' }));

    component.loadPerformerNames(['1', '2']);

    expect(component.performerNames).toEqual(['Kai']);
  });

  it('should emit close event', () => {
    spyOn(component.close, 'emit');

    component.close.emit();

    expect(component.close.emit).toHaveBeenCalled();
  });
});