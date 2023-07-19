import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.sevice';
import { UsersService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

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
    private usersService: UsersService
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
      this.usersService.getCurrentUser().subscribe(data => this.user = data)
    }

  onAccountInfoFormSubmit(): void {
    this.usersService.editUser(this.accountInfoForm.value).subscribe({
      next: (res) => {
        console.log(res)
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

}
