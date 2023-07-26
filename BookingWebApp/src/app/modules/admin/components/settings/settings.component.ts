import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.sevice';
import { UsersService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit{
  
  user: User;
  accountInfoForm: FormGroup;
  passwordForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private usersService: UsersService,
    private coreService: CoreService,
    private dialog: MatDialog
    ) {
      this.user = new User()
      this.accountInfoForm = this.fb.group({
        firstName: '',
        lastName: '',
        email: '',
        age: ''
      })
      this.passwordForm = this.fb.group({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      })
    }

    ngOnInit(): void {
      this.getAccountInfo();
    }

    getAccountInfo(): void {
      this.usersService.getCurrentUser().subscribe({
        next: (res) => {
          console.log(res)
          this.user = res
        }
      })
    }

  onAccountInfoFormSubmit(): void {
    this.usersService.editUser(this.accountInfoForm.value).subscribe({
      next: (res) => {
        console.log(res)
        this.coreService.openSnackBar("Account Info Saved!")
        this.getAccountInfo()
      }
    })
  }

  onPasswordFormSubmit(): void {
    console.log(this.passwordForm.value)
    console.log(this.passwordForm.value['oldPassword'])
    
    //Make sure that new passwords match
    let newPass1 = this.passwordForm.value['newPassword']
    let newPass2 = this.passwordForm.value['confirmNewPassword']
    if (newPass1 == newPass2) {
      this.usersService.changePassword(this.passwordForm.value).subscribe({
        next: (res) => {
          console.log(res)
          this.coreService.openSnackBar("Password Updated!")
        },
        error: (err) => {
          console.error(err)
        }
      })
    }
    else {
      console.error("New Passwords Do Not Match")
    }
  }

  deactivateAccount(): void {
    this.usersService.deactivateUser().subscribe({
      next: (res) => {
        this.authService.logout()
      }
    })
  }

  openConfirmationDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Do you want to deactivate your account?'
      },
      width: '30%',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deactivateAccount();
      }
    })
  }
}
