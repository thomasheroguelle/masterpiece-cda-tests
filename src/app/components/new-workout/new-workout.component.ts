import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Exercices } from '../../../interfaces/Exercices';
import { WorkoutlocalstorageService } from '../../services/workout/workoutlocalstorage.service';
import { ExercisesLocalStorageService } from '../../services/local-storage/exercises/exerciseslocalstorage.service';
import { Serie } from '../../../interfaces/Serie';
import { v4 as uuidv4 } from 'uuid';
import { SnackbarService } from '../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-new-workout',
  templateUrl: './new-workout.component.html',
  styleUrl: './new-workout.component.css',
})
export class NewWorkoutComponent {
  workoutForm: FormGroup;
  serieForm: FormGroup;
  exercices: Exercices[] = [];
  newSerie?: Serie;
  exercice!: Exercices;

  constructor(
    private readonly workoutLocalStorageService: WorkoutlocalstorageService,
    readonly exercicesLocalStorageService: ExercisesLocalStorageService,
    private readonly fb: FormBuilder,
    private snackBarService: SnackbarService,
  ) {
    this.workoutForm = this.fb.group({
      workoutName: ['', Validators.required],
      workoutDescription: ['', Validators.required],
    });
    this.serieForm = this.fb.group({
      repetitions: ['', [Validators.required]],
      weight: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {
    this.exercicesLocalStorageService.getExercices();
    this.exercicesLocalStorageService.exercices$.subscribe((exercices) => {
      this.exercices = exercices;
    });
  }

  constructSerieObject(exercise: Exercices) {
    const serieIncrement = exercise.series ? exercise.series.length + 1 : 1;
    return {
      repetitions: this.serieForm.value.repetitions,
      weight: this.serieForm.value.weight,
      id: uuidv4(),
      serieNumber: serieIncrement,
    };
  }

  constructWorkoutObject() {
    const exercicesAvecSeries = this.exercices.map((exercice) => ({
      ...exercice, // créé une copie de l'objet exercice
      series: exercice.series || [], // atribue l'objet série pour chaque exercice
    }));
    return {
      id: uuidv4(),
      name: this.workoutForm.value.workoutName,
      description: this.workoutForm.value.workoutDescription,
      exercices: exercicesAvecSeries,
    };
  }

  addSerieToExercise(exercise: Exercices) {
    if (!this.serieForm.valid) {
      this.snackBarService.showError(
        'Les champs de la série ne sont pas valides',
      );
      return;
    }

    if (!exercise.series) {
      exercise.series = [];
      console.log('Tableau vide');
    }

    exercise.series.push(this.constructSerieObject(exercise));
    this.snackBarService.showInfo(
      `Nouvelle série ajoutée à l'exercice : ${exercise.name} `,
    );

    this.serieForm.reset();
  }

  onSubmit() {
    if (!this.workoutForm.valid) {
      console.error('Remplir titre et/ou description');
      return;
    }

    if (!this.exercices || this.exercices.length === 0) {
      this.snackBarService.showError(
        'Aucun exercice sélectionné. Impossible de valider.',
      );
      return;
    }

    this.workoutLocalStorageService.saveWorkout(this.constructWorkoutObject());

    this.snackBarService.showSuccess('Création du programme réussie');
    console.log(
      'Création du programme réussie : ',
      this.constructWorkoutObject(),
    );

    this.workoutForm.reset();
  }

  deleteExercise(exercise: Exercices) {
    this.exercicesLocalStorageService.deleteExercice(exercise.id);
    this.snackBarService.showInfo('Exercice supprimé ✅');
  }

  deleteSerie(exerciceId: string, serieId: string) {
    this.exercicesLocalStorageService.deleteSerie(exerciceId, serieId);
    this.exercices;
    this.snackBarService.showInfo('Série supprimée ✅');
  }

  isFormInvalid(): boolean {
    return (
      !this.workoutForm.valid ||
      this.exercices.length === 0 ||
      this.exercices.some(
        (exercise) => !exercise.series || exercise.series.length === 0,
      )
    );
  }
}
