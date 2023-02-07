import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CoreservicesService } from '../core/coreservices.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  hide = true;

  constructor(private _fbf: FormBuilder, private _http: HttpClient, private router: Router, private _coreService: CoreservicesService){

    this.loginForm=this._fbf.group({
      userEmail:'',
      userPassword:'',
    });
  }

  onLoginSubmit() {
    
      this._http.post(`https://reqres.in/api/login`, {"email": this.email.value, "password":this.password.value}).subscribe((res)=>{
      const response = Object.assign(res);
      if (response.token) {
        this.router.navigate(['/', 'home']);
        localStorage.setItem('token', response.token);
      } 
    })
    
  }
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }
}
