import { Injectable } from '@angular/core';
import { Exercices } from '../../../../interfaces/Exercices';
import { BehaviorSubject } from 'rxjs';
import { Serie } from '../../../../interfaces/Serie';

@Injectable({
  providedIn: 'root',
})
export class ExercisesLocalStorageService {
  private exercicesSubject = new BehaviorSubject<Exercices[]>([]);
  exercices$ = this.exercicesSubject.asObservable();
  exercices: Exercices[] = [];

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

  deleteExercice(id: string) {
    const exercises = this.getExercices();
    const updatedExercise = exercises.filter((exercise) => exercise.id !== id);
    this.saveExercice(updatedExercise);
  }

  addSerie(exerciceId: string, newSerie: Serie) {
    const exercise = this.exercices.find((e) => e.id === exerciceId);
    if (exercise) {
      exercise.series.push(newSerie);
    }
  }

  deleteSerie(exerciceId: string, serieId: string) {
    const exercises = this.getExercices();
    const updatedExercises = exercises.map((exercise) => {
      if (exercise.id === exerciceId) {
        return {
          ...exercise,
          series: exercise.series
            ? exercise.series.filter((serie) => serie.id !== serieId)
            : [],
        };
      }
      return exercise;
    });

    this.saveExercice(updatedExercises);
  }
}
