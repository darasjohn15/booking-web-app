import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.sevice';

@Component({ 
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'] 
})
export class LoginComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthenticationService
    ) {}
    
    ngOnInit() {
        this.form = this.formBuilder.group({
            username: '',
            password: ''
        })
    }

    authForm = new FormGroup({
        userName: new FormControl(''),
        password: new FormControl('')
      })
      
    onSubmit() {
        console.log(this.authForm.value)

        this.submitted = true;

        if(this.form.invalid) {
            return;
        }

        this.loading = true

        let inputUserName = this.authForm.get('userName')?.value?.toString()
        let inputPassword = this.authForm.get('password')?.value?.toString()
        
        this.authService.login(inputUserName, inputPassword)
        .pipe(first())
        .subscribe({
            next: (response) => {
            console.log(response)
            console.log('Lets reroute and send that token!')
            this.router.navigateByUrl('')
            },
            error: (error) => console.log(error),
        })
    }

}