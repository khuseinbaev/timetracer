import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../core/auth/auth.service';
import {InteractService} from '../../core/service/interact.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              public user: InteractService) {
  }

  ngOnInit() {
    this.router.navigateByUrl('/main/timer').then();
  }

  logout() {
    this.authService.signOut().then();
  }

}
