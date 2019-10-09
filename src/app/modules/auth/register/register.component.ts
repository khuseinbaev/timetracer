import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {AuthService} from '../../../core/auth/auth.service';
import {InteractService} from '../../../core/service/interact.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  hide = true;

  constructor(private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder,
              private data: InteractService) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
    this.data.setTitle(['Create new Account', 'Already have an account? Sign In!', 'login']);
  }

  get formControls() {
    return this.registerForm.controls;
  }

  register() {
    if (this.registerForm.invalid) {
      return;
    }
    this.authService.emailRegister(this.registerForm.value.email, this.registerForm.value.password).then();
  }
}
