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
    token: Token | null;
    user: User = {
        firstName: ''
    }

    constructor(
        private authService: AuthenticationService,
        private userService: UsersService) {
        this.token = this.authService.tokenValue;
        userService.getUser('darasjohnson').subscribe(x => {
            console.log(x)
            //map user
            this.user.firstName = x.firstName
            this.user.lastName = x.lastName

            console.log(this.user)
        })
    }
}