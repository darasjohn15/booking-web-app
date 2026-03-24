import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  profileForm!: FormGroup;
  passwordForm!: FormGroup;

  isSavingProfile = false;
  isSavingPassword = false;
  isDeactivating = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.initializeForms();
    this.loadUserSettings();
  }

  initializeForms(): void {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]]
    });

    this.passwordForm = this.fb.group(
      {
        currentPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  loadUserSettings(): void {
    this.userService.getUser().subscribe({
      next: (user) => {
        this.profileForm.patchValue({
          name: user.name || '',
          email: user.email || ''
        });
      },
      error: () => {
        this.openSnackBar('Could not load account settings.', 'Close');
      }
    });
  }

  saveProfile(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.isSavingProfile = true;

    const payload = {
      id: this.userService.getUserId(),
      name: this.profileForm.value.name,
      email: this.profileForm.value.email
    };

    this.userService.editUser(payload).subscribe({
      next: () => {
        this.isSavingProfile = false;
        this.openSnackBar('Profile updated successfully.', 'Close');
        this.profileForm.markAsPristine();
      },
      error: () => {
        this.isSavingProfile = false;
        this.openSnackBar('Failed to update profile.', 'Close');
      }
    });
  }

  updatePassword(): void {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.isSavingPassword = true;

    const payload = {
      user_id: this.userService.getUserId(),
      current_password: this.passwordForm.value.currentPassword,
      new_password: this.passwordForm.value.newPassword
    };

    this.userService.changePassword(payload).subscribe({
      next: () => {
        this.isSavingPassword = false;
        this.openSnackBar('Password updated successfully.', 'Close');
        this.passwordForm.reset();
      },
      error: () => {
        this.isSavingPassword = false;
        this.openSnackBar('Failed to update password.', 'Close');
      }
    });
  }

  deactivateAccount(): void {
    const confirmed = window.confirm(
      'Are you sure you want to deactivate your account? You can reactivate it later.'
    );

    if (!confirmed) {
      return;
    }

    this.isDeactivating = true;

    this.userService.deactivateUser().subscribe({
      next: () => {
        this.isDeactivating = false;
        this.openSnackBar('Your account has been deactivated.', 'Close');
      },
      error: () => {
        this.isDeactivating = false;
        this.openSnackBar('Failed to deactivate account.', 'Close');
      }
    });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (!newPassword || !confirmPassword) {
      return null;
    }

    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  get profileControls() {
    return this.profileForm.controls;
  }

  get passwordControls() {
    return this.passwordForm.controls;
  }
}