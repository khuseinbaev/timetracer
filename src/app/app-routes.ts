import {Routes} from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/main/main.module')
      .then(m => m.MainModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module')
      .then(m => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
