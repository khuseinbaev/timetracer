import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';

import {
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule,
  MatCheckboxModule
} from '@angular/material';
import {MatTableModule} from '@angular/material/table';

import {MainComponent} from './main.component';
import {TimerComponent} from './timer/timer.component';

import {MAIN_ROUTES} from './main-routes';
import {DialogComponent} from './timer/dialog/dialog.component';
import {UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    MainComponent,
    TimerComponent,
    DialogComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterModule.forChild(MAIN_ROUTES),
    MatGridListModule,
    MatSelectModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    MatDialogModule,
    MatCheckboxModule
  ],
  entryComponents: [DialogComponent]
})
export class MainModule {
}
