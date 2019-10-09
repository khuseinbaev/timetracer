import {Injectable, NgZone} from '@angular/core';
import {Router} from '@angular/router';

import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs';
import 'rxjs/add/operator/switchMap';

import {User} from '../models/user';
import {InteractService} from '../service/interact.service';

@Injectable()
export class AuthService {
  user: Observable<User>;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private ngZone: NgZone,
              private roles: InteractService) {
    //// Get auth data, then get firestore user document || null
    this.user = this.afAuth.authState
      .switchMap(user => {
        if (user) {
          const userInDB = this.afs.doc<User>('users/' + user.uid).valueChanges();
          userInDB.subscribe(data => {
            roles.setUser(data);
          });
          return userInDB;
        } else {
          return of(null);
        }
      });
  }

  async googleLogin() {
    const provider = await new firebase.auth.GoogleAuthProvider();
    return await this.oAuthLogin(provider);
  }

  async facebookLogin() {
    const provider = await new firebase.auth.FacebookAuthProvider();
    return await this.oAuthLogin(provider);
  }

  async microsoftLogin() {
    const provider = await new firebase.auth.OAuthProvider('microsoft.com');
    return await this.oAuthLogin(provider);
  }

  async githubLogin() {
    const provider = await new firebase.auth.GithubAuthProvider();
    return await this.oAuthLogin(provider);
  }

  async emailLogin(email: string, password: string) {
    const provider = await this.afAuth.auth.signInWithEmailAndPassword(email, password).then((credential) => {
      this.updateUserData(credential.user).then(() => {
        this.ngZone.run(() => this.router.navigateByUrl('main')).then();
      });
    });
  }

  async emailRegister(email: string, password: string) {
    const provider = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    this.sendEmailVerification();
  }

  sendEmailVerification() {
    this.afAuth.auth.currentUser.sendEmailVerification().then();
    this.ngZone.run(() => this.router.navigateByUrl('auth/verify-email')).then();
  }

  sendPasswordResetEmail(passwordResetEmail: string): any {
    this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail).then();
  }

  async signOut() {
    await this.afAuth.auth.signOut().then(() => {
      this.ngZone.run(() => this.router.navigateByUrl('auth')).then();
    });
  }

  private async oAuthLogin(provider) {
    return await this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user).then(() => {
          this.ngZone.run(() => this.router.navigateByUrl('main')).then();
        });
      });
  }

  ///// Abilities and Roles Authorizations
  private async updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc('users/' + user.uid);
    const data: User = {
      uid: user.uid,
      roles: {
        roleUser: true
      },
      displayName: user.providerData[0].displayName,
      photoURL: user.providerData[0].photoURL,
      providerId: user.providerData[0].providerId,
      email: user.providerData[0].email,
      phoneNumber: user.providerData[0].phoneNumber,
      creationTime: user.metadata.creationTime,
      lastSignInTime: user.metadata.lastSignInTime,
      emailVerified: user.emailVerified,
    };
    return await userRef.set(data, {merge: true}); // without {merge:true} it will overwrite nor update.
  }

  async changeAdmin(uid, bool: boolean) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc('users/' + uid);
    const data: { roles: { roleAdmin: boolean; roleUser: boolean } } = {
      roles: {
        roleUser: true,
        roleAdmin: bool
      }
    };
    return await userRef.set(data, {merge: true});
  }
}


/***
 ///// Role-based Authorization //////

 canRead(user: User): boolean {
    const allowed = ['roleUser', 'roleAdmin'];
    return this.checkAuthorization(user, allowed);
  }

 canWrite(user: User): boolean {
    const allowed = ['roleAdmin'];
    return this.checkAuthorization(user, allowed);
  }

 // determines if user has matching role
 private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) {
      return false;
    }
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true;
      }
    }
    return false;
  }

 service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}

 */
