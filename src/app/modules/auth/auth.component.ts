import {AfterViewChecked, ChangeDetectorRef, Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../core/auth/auth.service';
import {InteractService} from '../../core/service/interact.service';

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements AfterViewChecked {
  title: string;

  constructor(public authService: AuthService,
              private router: Router,
              public data: InteractService,
              private changeDetector: ChangeDetectorRef) {
    this.data.setTitle(['Login Into Your Account', 'Don`t have an account? Sign Up!', 'register']);
    if (this.router.url === '/auth') {
      this.router.navigateByUrl('/auth/login').then();
    }
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

}


