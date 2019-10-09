import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {environment} from '../environments/environment.prod';
import {AuthService} from './core/auth/auth.service';

import {MainModule} from './modules/main/main.module';
import {AuthModule} from './modules/auth/auth.module';

import {APP_ROUTES} from './app-routes';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MainModule,
    AuthModule,
    RouterModule.forRoot(APP_ROUTES, {enableTracing: false}),
    AngularFireModule.initializeApp(environment.firebase, 'time-tracer-1'),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
