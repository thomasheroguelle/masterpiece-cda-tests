import { Component } from '@angular/core';
import { WorkoutlocalstorageService } from '../../services/workout/workoutlocalstorage.service';
import { Workout } from '../../../interfaces/Workout';

@Component({
  selector: 'app-workout-history',
  templateUrl: './workout-history.component.html',
  styleUrl: './workout-history.component.css',
})
export class WorkoutHistoryComponent {
  workouts!: Workout[];

  constructor(
    private readonly workoutLocalStorageService: WorkoutlocalstorageService,
  ) {}

  ngOnInit() {
    this.workouts = this.workoutLocalStorageService.getWorkouts();
  }
}
