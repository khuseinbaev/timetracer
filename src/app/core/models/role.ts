export class Roles {
  roleUser: boolean;
  roleAdmin?: boolean;
}

export enum Role {
  roleUser = 'roleUser',
  roleAdmin = 'roleAdmin'
}
