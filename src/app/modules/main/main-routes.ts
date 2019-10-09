import {Routes} from '@angular/router';

import {MainComponent} from './main.component';
import {TimerComponent} from './timer/timer.component';
import {UsersComponent} from './users/users.component';

import {AuthGuard} from '../../core/auth/auth.guard';
import {Role} from '../../core/models/role';

export const MAIN_ROUTES: Routes = [
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {path: 'timer', component: TimerComponent},
      {path: 'users',
        component: UsersComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [Role.roleAdmin]
        }
      }
    ]
  },
  {path: '', pathMatch: 'full', redirectTo: 'main'},
];
