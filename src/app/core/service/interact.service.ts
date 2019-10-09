import {Injectable} from '@angular/core';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class InteractService {
  private title: string[];
  private roles: User;

  constructor() {
  }

  public getTitle(): string[] {
    return this.title;
  }

  public setTitle(newName: string[]): void {
    this.title = newName;
  }

  public getUser(): User {
    return this.roles;
  }

  public setUser(newName: User): void {
    this.roles = newName;
  }

}
