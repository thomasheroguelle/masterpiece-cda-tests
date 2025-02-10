import { Injectable } from '@angular/core';
import { Exercices } from '../../../../interfaces/Exercices';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExercisesLocalStorageService {
  private exercicesSubject = new BehaviorSubject<Exercices[]>([]);
  exercices$ = this.exercicesSubject.asObservable();

  private readonly exerciceKey = 'exercice';

  constructor() {}

  saveExercice(exercices: Exercices[]): void {
    console.log('Saving exercices to localStorage:', exercices);
    localStorage.setItem(this.exerciceKey, JSON.stringify(exercices));
    this.exercicesSubject.next(exercices);
  }

  getExercices(): Exercices[] {
    const data = localStorage.getItem(this.exerciceKey);
    const exercices = data ? JSON.parse(data) : [];
    return exercices;
  }
}
