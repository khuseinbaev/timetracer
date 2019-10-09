import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {AuthService} from '../../../core/auth/auth.service';
import {InteractService} from '../../../core/service/interact.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;

  constructor(private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder,
              private data: InteractService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
    this.data.setTitle(['Login Into Your Account', 'Don`t have an account? Sign Up!', 'register']);
  }

  get formControls() {
    return this.loginForm.controls;
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.emailLogin(this.loginForm.value.email, this.loginForm.value.password).then();
  }


}
