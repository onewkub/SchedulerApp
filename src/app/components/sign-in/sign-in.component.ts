import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router,
    public formBuilder: FormBuilder,
    public authService: AuthService,
  ) {
    this.loginForm = formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  ngOnInit() {
    this.authService.isLoggedIn().then(
      () => {
        this.router.navigate(['/']);
      }
    ).catch(
      () => { }
    );
  }

  onSubmit(formDirective: FormGroupDirective) {
    this.logIn(this.loginForm.value, formDirective);
  }

  logIn(input: { email: string; password: string; }, formDirective: FormGroupDirective) {
    this.authService.logIn(input.email, input.password).then(
      () => {
        this.router.navigate(['/']);
      }
    ).catch(
      () => {
        this.loginForm.reset();
        formDirective.resetForm();
        alert('Incorrect email or password.');
      }
    );
  }
}
