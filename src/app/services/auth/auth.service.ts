import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../../interfaces/User';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { MessageResponse } from '../../../interfaces/MessageResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(user: User): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(environment.AUTH_API + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password,
    });
  }
}
