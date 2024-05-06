import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../models/user';
import { ILoginData } from '../models/login-data';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private MOCK_AUTH_USER: IUser = {
    id: "1",
    email: "gonzalo.britez94@gmail.com",
    createdAt: new Date(),
    firstName: "Gonzalo",
    lastName: "Britez",
    role: 'ADMIN'
  };

  private _authUser$ = new BehaviorSubject<IUser | null>(null);
  public authUser$ = this._authUser$.asObservable();

  constructor(private router: Router) { }

  login(data: ILoginData): void {

    if (data.username === 'admin' && data.password === "1234") {
      this._authUser$.next(this.MOCK_AUTH_USER)
      localStorage.setItem('accessToken', '615ae670-9f54-4e9b-ae06-fea183b1d3ee');
      this.router.navigate(['dashboard'])
    }
  }

  logout(): void {
    this._authUser$.next(null);
    localStorage.removeItem('accessToken');
  }

  verifyToken(): boolean {
    const token = localStorage.getItem('accessToken');
    if (token) {
      return true;
    }
    return false;
  }
}
