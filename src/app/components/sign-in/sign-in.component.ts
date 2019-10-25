import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    public formBuilder :FormBuilder,
    public authService: AuthService,
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
    // this.authService.doLogin(value);
    this.authService.doLoginWihtPersistent(value);
  }
  tryLogout(){
    this.authService.doLogout();
  }
}
