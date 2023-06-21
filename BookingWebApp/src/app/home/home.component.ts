import { UsersService } from '../services/user.service'
import { Token } from './../models/token';
import { User } from '../models/user';
import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.sevice';
import { first } from 'rxjs/operators';

@Component({ 
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'] })
export class HomeComponent {
    user: User = {
        firstName: ''
    }

    constructor(
        private authService: AuthenticationService,
        private userService: UsersService) {
        let currentUserId = localStorage.getItem('userId')
        console.log('The current user: ' + currentUserId)
        console.log('The current token: ' + authService.tokenValue)
        this.userService.getUser(currentUserId).subscribe(x => {
            console.log(x)
            //map user
            this.user.firstName = x.firstName
            this.user.lastName = x.lastName


            console.log(this.user)
        })
    }
}