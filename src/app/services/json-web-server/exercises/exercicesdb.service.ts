import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bodyparts, Exercices } from '../../../../interfaces/Exercices';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ExercicesDbService {
  constructor(private readonly http: HttpClient) {}

  getExercices(): Observable<Exercices[]> {
    return this.http.get<Exercices[]>(environment.LOCAL_DB);
  }

  getExerciceById(id: string): Observable<Exercices> {
    return this.http.get<Exercices>(`${environment.LOCAL_DB}/${id}`);
  }
}
