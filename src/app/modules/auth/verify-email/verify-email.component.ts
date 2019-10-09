import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {AuthService} from '../../../core/auth/auth.service';
import {InteractService} from '../../../core/service/interact.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  verifyForm: FormGroup;

  constructor(private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder,
              private data: InteractService) {
  }

  ngOnInit() {
    this.verifyForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });
    this.data.setTitle(['Verify your email', 'Already have an account? Sign In!', 'login']);
  }

  sendAgain() {
    this.authService.sendEmailVerification();
  }
}
