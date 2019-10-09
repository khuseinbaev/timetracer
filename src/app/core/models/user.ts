import {Roles} from './role';

export class User {
  uid: string;
  roles: Roles;
  displayName: string;
  photoURL: string;
  providerId: string;
  email: string;
  phoneNumber: string;
  creationTime: string;
  lastSignInTime: string;
  emailVerified: boolean;
}
