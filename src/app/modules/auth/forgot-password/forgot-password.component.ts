import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {AuthService} from '../../../core/auth/auth.service';
import {InteractService} from '../../../core/service/interact.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm: FormGroup;

  constructor(private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder,
              private data: InteractService) {
  }

  ngOnInit() {
    this.forgotForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
    this.data.setTitle(['Forgotten your password', 'Already have an account? Sign In!', 'login']);
  }

  get formControls() {
    return this.forgotForm.controls;
  }

  sendPasswordReset() {
    if (this.forgotForm.invalid) {
      return;
    }
    this.authService.sendPasswordResetEmail(this.forgotForm.value.email);
  }
}
