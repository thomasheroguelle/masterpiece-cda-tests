import { Component, Input } from '@angular/core';
import { WorkoutlocalstorageService } from '../../services/workout/workoutlocalstorage.service';
import { Workout } from '../../../interfaces/Workout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workout-control-menu',
  templateUrl: './workout-control-menu.component.html',
  styleUrl: './workout-control-menu.component.css',
})
export class WorkoutControlMenuComponent {
  @Input() workoutId!: string;
  workout!: Workout;

  constructor(private route: Router) {}

  workoutRouter() {
    if (this.workoutId) {
      this.route.navigate(['/update', this.workoutId]);
    } else {
      console.error("Pas d'ID récupéré");
    }
  }
}
