import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private formBuilder :FormBuilder,
    public authService: AuthService,
    private router: Router
    ) { 
    this.loginForm = formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  ngOnInit() {
  }


  onSubmit(){
    this.tryLogin(this.loginForm.value);
  }
  tryLogin(value){
    this.authService.doLogin(value);
  }
  tryLogout(){
    this.authService.doLogout();
  }
}
