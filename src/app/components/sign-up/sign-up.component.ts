import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public authService: AuthService
  ) {
    this.registerForm = this.formBuilder.group({
      displayName: [''],
      email: ['', Validators.email],
      password: [''],
      confirmPassword: ['']
    }, { validator: this.checkPasswords });
  }

  registerForm: FormGroup;
  passwordCheck: Validators;
  matcher = new MyErrorStateMatcher();

  ngOnInit() {
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  onSubmit(formDirective: FormGroupDirective) {
    this.tryRegister(this.registerForm.value);
    this.registerForm.reset();
    formDirective.resetForm();
  }

  tryRegister(input: { displayName: string; email: string; password: string; }) {
    this.authService.register(input.displayName, input.email, input.password).then(
      () => {
        this.router.navigate(['/']);
      }
    ).catch(
      err => {
        console.error(err);
      }
    );
  }
}
