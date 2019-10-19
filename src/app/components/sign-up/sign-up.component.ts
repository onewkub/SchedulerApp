import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
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


  ngOnInit() {
  }

  registerForm: FormGroup;
  passwordCheck: Validators;

  matcher = new MyErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private router : Router,
    public authService: AuthService
    ) {
    this.registerForm = this.formBuilder.group({
      displayName: [''],
      email: ['', Validators.email], 
      password: [''],
      confirmPassword: ['']
    }, { validator: this.checkPasswords });

  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  onSubmit(formDirective: FormGroupDirective){
    this.tryRegister(this.registerForm.value);
    this.registerForm.reset();
    formDirective.resetForm();
    
  }

  tryRegister(value){
    this.authService.doRegister(value);
  }

}
