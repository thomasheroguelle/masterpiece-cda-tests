import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WorkoutlocalstorageService } from '../../services/workout/workoutlocalstorage.service';
import { Workout } from '../../../interfaces/Workout';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-workout-control-menu',
  templateUrl: './workout-control-menu.component.html',
  styleUrl: './workout-control-menu.component.css',
})
export class WorkoutControlMenuComponent {
  /*
  Utilise @Input() pour recevoir des données et afficher ou manipuler ces données dans le composant enfant.
  Utilise @Output() pour notifier un parent de changements ou actions effectuées dans l'enfant (comme un clic, une modification, etc.).
*/
  @Input() workoutId!: string;
  @Output() workoutDeleted = new EventEmitter<void>();

  workout!: Workout;

  constructor(
    private route: Router,
    private readonly workoutLocalStorageService: WorkoutlocalstorageService,
    private readonly snackbarService: SnackbarService,
  ) {}

  workoutRouter() {
    if (this.workoutId) {
      this.route.navigate(['/update', this.workoutId]);
    } else {
      console.error("Pas d'ID récupéré");
    }
  }

  deleteWorkout() {
    this.workoutLocalStorageService.deleteWorkout(this.workoutId);
    this.snackbarService.showSuccess('Le programme a bien été supprimé ');
    this.workoutDeleted.emit();
  }
}
