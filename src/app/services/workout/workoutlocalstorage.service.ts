import { Injectable } from '@angular/core';
import { Workout } from '../../../interfaces/Workout';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkoutlocalstorageService {
  private readonly storageKey = 'workout';

  constructor() {}

  private workoutSubject = new BehaviorSubject<Workout[]>(this.getWorkouts());
  workouts$ = this.workoutSubject.asObservable();

  saveWorkout(workout: Workout) {
    const programs = this.getWorkouts();
    programs.push(workout);
    localStorage.setItem(this.storageKey, JSON.stringify(programs));
  }

  getWorkouts(): Workout[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  updateWorkout(updatedWorkout: Workout) {
    const workouts = localStorage.getItem(this.storageKey);

    if (workouts) {
      const workoutList: Workout[] = JSON.parse(workouts);
      const index = workoutList.findIndex((w) => w.id === updatedWorkout.id);
      if (index !== -1) {
        workoutList[index] = updatedWorkout;
        localStorage.setItem(this.storageKey, JSON.stringify(workoutList));
        this.workoutSubject.next(workoutList);
      }
    }
  }

  getWorkoutById(workoutId: string): Workout | null {
    console.group('getWorkoutById');
    const workouts = localStorage.getItem(this.storageKey);

    if (workouts) {
      const workoutsList: Workout[] = JSON.parse(workouts);
      console.log('liste des workouts', workoutsList);

      const foundWorkout = workoutsList.find((w) => w.id === workoutId);
      console.log('ID du workout trouvé :', foundWorkout);

      console.groupEnd();

      return foundWorkout || null;
    } else {
      return null;
    }
  }

  deleteSerie(workoutId: string, exerciceId: string, serieId: string) {
    const workout = this.getWorkoutById(workoutId);

    const exercice = workout?.exercices.find((ex) => ex.id === exerciceId);
    if (!exercice) {
      console.error('Exercice introuvable');
      return;
    }
    exercice.series = exercice.series.filter((s) => s.id !== serieId);

    if (workout) {
      this.updateWorkout(workout);
    }
  }

  deleteWorkout(workoutId: string) {
    const workouts = this.getWorkouts().filter(
      (workout) => workout.id !== workoutId,
    );
    localStorage.setItem(this.storageKey, JSON.stringify(workouts));
  }
}
