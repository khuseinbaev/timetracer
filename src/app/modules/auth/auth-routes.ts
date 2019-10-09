import {Routes} from '@angular/router';

import {AuthComponent} from './auth.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {VerifyEmailComponent} from './verify-email/verify-email.component';

export const LOGIN_ROUTES: Routes = [
  // {path: 'auth', pathMatch: 'full', redirectTo: 'auth/login'},
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'forgot-password', component: ForgotPasswordComponent},
      {path: 'verify-email', component: VerifyEmailComponent}
    ]
  },
  {path: '', pathMatch: 'full', redirectTo: 'auth'},
];
