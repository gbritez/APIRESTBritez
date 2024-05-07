import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { IUser } from '../models/user';
import { ILoginData } from '../models/login-data';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://6639ac341ae792804bec6f8e.mockapi.io/api/login';
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

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  login(data: ILoginData): void {
    this.http.get<ILoginData[]>(this.url).subscribe({

      next: (users: ILoginData[]) => {
        const matchedUser = users.find(user => user.username === data.username && user.password === data.password);

        if (matchedUser) {
          this._authUser$.next(this.MOCK_AUTH_USER);
          localStorage.setItem('accessToken', '615ae670-9f54-4e9b-ae06-fea183b1d3ee');
          this.router.navigate(['dashboard']);
        }
      },
    });
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
