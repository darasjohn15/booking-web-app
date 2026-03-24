import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoreService } from './core.service';

describe('CoreService', () => {
  let service: CoreService;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      providers: [
        CoreService,
        { provide: MatSnackBar, useValue: snackBarSpy }
      ]
    });

    service = TestBed.inject(CoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open snack bar with provided message and default action', () => {
    service.openSnackBar('Test message');

    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'Test message',
      'ok',
      { duration: 1000 }
    );
  });

  it('should open snack bar with provided message and custom action', () => {
    service.openSnackBar('Saved successfully', 'Close');

    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'Saved successfully',
      'Close',
      { duration: 1000 }
    );
  });
});