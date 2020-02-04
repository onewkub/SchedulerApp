import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
  ) {
    this.loginForm = formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  ngOnInit() {
  }

  onSubmit(formDirective: FormGroupDirective) {
    this.tryLogin(this.loginForm.value, formDirective);
  }

  tryLogin(input: { email: string; password: string; }, formDirective: FormGroupDirective) {
    if (!this.authService.doLogin(input.email, input.password)) {
      alert('Your Email or Password Wrong');
      this.loginForm.reset();
      formDirective.resetForm();
    }
  }
}
