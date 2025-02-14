import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutlocalstorageService } from '../../services/workout/workoutlocalstorage.service';
import { Workout } from '../../../interfaces/Workout';
import { Exercices } from '../../../interfaces/Exercices';
import { Serie } from '../../../interfaces/Serie';
import { v4 as uuidv4 } from 'uuid';
import { SnackbarService } from '../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-update-workout',
  templateUrl: './update-workout.component.html',
  styleUrls: ['./update-workout.component.css'],
})
export class UpdateWorkoutComponent implements OnInit {
  workoutId: string = '';
  workout: Workout | null = null;

  constructor(
    private workoutLocalStorageService: WorkoutlocalstorageService,
    private route: ActivatedRoute,
    private snackBar: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.workoutId = this.route.snapshot.paramMap.get('id') || '';
    if (this.workoutId) {
      this.workout = this.workoutLocalStorageService.getWorkoutById(
        this.workoutId,
      );
    }
  }

  updateWorkout() {
    if (this.workout) {
      this.workoutLocalStorageService.updateWorkout(this.workout);
      this.snackBar.showSuccess('Séance mise à jour ✅');
    }
  }

  addExercisesToWorkout(exercises: Exercices[]) {
    if (this.workout) {
      const newExercises = exercises.filter(
        (ex) =>
          !this.workout!.exercices.some(
            (existingEx) => existingEx.id === ex.id,
          ),
      );
      if (newExercises.length > 0) {
        this.workout.exercices = [...this.workout.exercices, ...newExercises];
        this.updateWorkout();
      }
    }
  }

  addSerie(exercice: Exercices) {
    if (!exercice.series) {
      exercice.series = [];
    }
    const newSerie: Serie = {
      id: uuidv4(),
      serieNumber: exercice.series.length + 1,
      repetitions: 0,
      weight: 0,
    };
    exercice.series.push(newSerie);
    this.updateWorkout();
  }
}
