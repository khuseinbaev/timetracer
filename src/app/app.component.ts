import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthLocalService} from './core/auth/auth-local.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Time Tracer';

  constructor(private router: Router, private authService: AuthLocalService) {
    if (authService.isLoggedIn === true) {
      this.router.navigate(['main']);
    }
  }

}
