import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercices } from '../../../interfaces/Exercices';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ExercicesService {
  constructor(private readonly http: HttpClient) {}

  getExercices(): Observable<Exercices[]> {
    return this.http.get<Exercices[]>(environment.LOCAL_DB);
  }
}
