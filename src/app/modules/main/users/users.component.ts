import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {AuthService} from '../../../core/auth/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any;
  checked: { [id: string]: boolean; } = {};

  constructor(private afs: AngularFirestore,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.getData().then();
  }

  async getData() {
    const collect = await this.afs.collection('users');
    this.users = await collect.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data()))
    );
    const checked: { [id: string]: boolean; } = {};
    this.users.subscribe(user => {
      user.forEach(value => {
        checked[value.uid] = value.roles.roleAdmin;
      });
    });
    this.checked = checked;
  }

  changeAdmin(uid: string) {
    this.authService.changeAdmin(uid, this.checked[uid]).then();
  }

}
