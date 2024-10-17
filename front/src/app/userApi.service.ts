import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin, UserResp } from './models/user.model';

@Injectable({ providedIn: 'root' })
export class UserApiService {
  signup(data: { userData: UserLogin & { username: string } }) {
    return this.http.post<{ username: string; id: number }>(
      'http://localhost:3000/auth/register',
      {
        user_name: data.userData.username,
        email: data.userData.email,
        password: data.userData.password,
      }
    );
  }

  login(data: { userData: UserLogin }) {
    return this.http.post<UserResp>('http://localhost:3000/auth/login', {
      email: data.userData.email,
      password: data.userData.password,
    });
  }
  constructor(private http: HttpClient) {}
}
