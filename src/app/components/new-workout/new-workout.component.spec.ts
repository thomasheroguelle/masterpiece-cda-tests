import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWorkoutComponent } from './new-workout.component';
import { WorkoutlocalstorageService } from '../../services/workout/workoutlocalstorage.service';
import { Bodyparts, Exercices } from '../../../interfaces/Exercices';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PopupComponent } from '../popup/popup.component';
import { Serie } from '../../../interfaces/Serie';
import { v4 as uuidv4 } from 'uuid';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ExercisesLocalStorageService } from '../../services/local-storage/exercises/exerciseslocalstorage.service';

describe('NewWorkoutComponent', () => {
  let component: NewWorkoutComponent;
  let fixture: ComponentFixture<NewWorkoutComponent>;
  let workoutService: jasmine.SpyObj<WorkoutlocalstorageService>;
  let exercisesLocalStorage: jasmine.SpyObj<ExercisesLocalStorageService>;

  beforeEach(async () => {
    workoutService = jasmine.createSpyObj('WorkoutlocalstorageService', [
      'saveWorkout',
    ]);
    exercisesLocalStorage = jasmine.createSpyObj(
      'ExercisesLocalStorageService',
      ['deleteExercice'],
    );

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],

      declarations: [NewWorkoutComponent, PopupComponent],
      providers: [
        FormBuilder,
        { provide: WorkoutlocalstorageService, useValue: workoutService },
        provideAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const mockSerie: Serie = {
    id: '1',
    serieNumber: 1,
    repetitions: 10,
    weight: 20,
  };

  const mockExercice: Exercices = {
    id: uuidv4(),
    name: 'Pompes',
    instructions: 'Commencez en position de planche...',
    type: 'Poids du corps',
    difficultyLevel: 'Intermédiaire',
    bodypart: [Bodyparts.Poitrine, Bodyparts.Triceps, Bodyparts.Épaules],
    gifUrl: 'assets/exercices/pushup.jpg',
    secondaryMuscles: ['Core', 'Bas du dos'],
    equipment: 'Poids du corps',
    steps: [
      'Positionnez vos mains un peu plus larges que vos épaules.',
      'Abaissez votre corps en fléchissant les coudes.',
      'Poussez avec vos bras pour revenir à la position de départ.',
    ],
    series: [mockSerie],
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create new workout with exercices and series and saved in local storage', () => {
    component.workoutForm.setValue({
      workoutName: 'My workout',
      workoutDescription: 'Fast workout after work',
    });

    component.exercices = [mockExercice];

    expect(component.workoutForm.valid).toBeTrue();

    component.onSubmit();

    expect(workoutService.saveWorkout).toHaveBeenCalledWith(
      jasmine.objectContaining({
        name: 'My workout',
        description: 'Fast workout after work',
        exercices: [mockExercice],
      }),
    );
  });

  it('should delete exercise', () => {
    spyOn(component.exercicesLocalStorageService, 'deleteExercice');

    component.exercices = [mockExercice];
    component.deleteExercise(mockExercice);

    expect(
      component.exercicesLocalStorageService.deleteExercice,
    ).toHaveBeenCalledWith(mockExercice.id);
  });

  it('should delete serie', () => {
    spyOn(component.exercicesLocalStorageService, 'deleteSerie');

    component.exercices = [mockExercice];
    component.deleteSerie(mockExercice.id, mockSerie.id);

    expect(
      component.exercicesLocalStorageService.deleteSerie,
    ).toHaveBeenCalledWith(mockExercice.id, mockSerie.id);
  });
});
