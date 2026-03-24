import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationCardComponent } from './application-card.component';
import { UsersService } from 'src/app/services/user.service';
import { of, throwError } from 'rxjs';
import { User } from 'src/app/models/user';

describe('ApplicationCardComponent', () => {
  let component: ApplicationCardComponent;
  let fixture: ComponentFixture<ApplicationCardComponent>;
  let userServiceSpy: jasmine.SpyObj<UsersService>;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UsersService', ['getUser']);

    await TestBed.configureTestingModule({
      declarations: [ApplicationCardComponent],
      providers: [
        { provide: UsersService, useValue: userServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ApplicationCardComponent);
    component = fixture.componentInstance;

    // mock input before ngOnInit runs
    component.application = { performer_id: 123 };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ngOnInit calls loadApplicationCard
  it('should call loadApplicationCard on init', () => {
    spyOn(component, 'loadApplicationCard');

    component.ngOnInit();

    expect(component.loadApplicationCard).toHaveBeenCalled();
  });

  // successful user fetch
  it('should load performer on success', () => {
    const mockUser: User = { id: '123', name: 'Razzo the Performer' };
    userServiceSpy.getUser.and.returnValue(of(mockUser));

    component.loadApplicationCard();

    expect(userServiceSpy.getUser).toHaveBeenCalledWith(123);
    expect(component.performer).toEqual(mockUser);
  });

  // error case
  it('should handle error when loading performer fails', () => {
    spyOn(console, 'log');
    userServiceSpy.getUser.and.returnValue(
      throwError(() => new Error('Error'))
    );

    component.loadApplicationCard();

    expect(console.log).toHaveBeenCalledWith('Could not load user.');
  });
});