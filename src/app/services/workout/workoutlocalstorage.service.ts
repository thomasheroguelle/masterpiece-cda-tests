import { Injectable } from '@angular/core';
import { Workout } from '../../../interfaces/Workout';

@Injectable({
  providedIn: 'root',
})
export class WorkoutlocalstorageService {
  private readonly storageKey = 'workout';

  constructor() {}

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
}
