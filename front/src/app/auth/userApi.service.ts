import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin, UserResp } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserApiService {
  signup(data: { userData: UserLogin & { username: string } }) {
    return this.http.post<{
      userData: UserResp;
      tokens: {
        accessToken: string;
        refreshToken: string;
      };
    }>('http://localhost:3000/auth/register', {
      username: data.userData.username,
      email: data.userData.email,
      password: data.userData.password,
    });
  }

  login(data: { userData: UserLogin }) {
    return this.http.post<{
      user: UserResp;
      tokens: {
        accessToken: string;
        refreshToken: string;
      };
    }>('http://localhost:3000/auth/login', {
      email: data.userData.email,
      password: data.userData.password,
    });
  }

  refreshAccessToken(refreshToken: string) {
    return this.http.post<{ accessToken: string }>(
      'http://localhost:3000/auth/refresh',
      {
        refreshToken: refreshToken,
      }
    );
  }

  logout(refreshToken: string) {
    return this.http.post('http://localhost:3000/auth/logout', {
      refreshToken,
    });
  }
  constructor(private http: HttpClient) {}
}
