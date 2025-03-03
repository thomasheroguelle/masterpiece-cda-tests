import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../../interfaces/User';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { MessageResponse } from '../../../interfaces/MessageResponse';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(user: User): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(
      environment.AUTH_API + 'signup',
      {
        username: user.username,
        email: user.email,
        password: user.password,
      },
      httpOptions,
    );
  }

  login(user: User): Observable<User> {
    return this.http.post<User>(
      environment.AUTH_API + 'signin',
      {
        username: user.username,
        password: user.password,
      },
      httpOptions,
    );
  }

  logout(): Observable<any> {
    return this.http.post(environment.AUTH_API + 'signout', {}, httpOptions);
  }
}
