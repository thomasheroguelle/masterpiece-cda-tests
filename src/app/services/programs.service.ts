import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Program } from '../../interfaces/Program';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProgramsService {
  constructor(private readonly http: HttpClient) {}

  getPrograms(): Observable<Program[]> {
    return this.http.get<Program[]>(environment.PROGRAMS);
  }
}
