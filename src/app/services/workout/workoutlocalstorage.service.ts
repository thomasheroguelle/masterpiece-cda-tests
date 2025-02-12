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
}
