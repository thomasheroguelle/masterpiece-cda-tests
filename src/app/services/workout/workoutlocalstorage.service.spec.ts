import { TestBed } from '@angular/core/testing';

import { WorkoutlocalstorageService } from './workoutlocalstorage.service';
import { Workout } from '../../../interfaces/Workout';
import { Serie } from '../../../interfaces/Serie';
import { Bodyparts, Exercices } from '../../../interfaces/Exercices';

describe('WorkoutlocalstorageService', () => {
  let service: WorkoutlocalstorageService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutlocalstorageService);
  });

  const mockSerie: Serie = {
    id: '1',
    serieNumber: 1,
    repetitions: 10,
    weight: 20,
  };

  const mockExercice: Exercices = {
    id: '1',
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

  const mockWorkout: Workout[] = [
    {
      name: 'Test Program',
      description: 'Test Program Description',
      id: '',
      exercices: [mockExercice],
    },
    {
      name: 'Program 2',
      description: 'Description 2',
      id: '',
      exercices: [mockExercice],
    },
  ];

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should save a workout in local storage', () => {
    const mockWorkout: Workout = {
      id: '1',
      name: 'Test Program',
      description: 'Test Program Description',
      exercices: [],
    };
    service.saveWorkout(mockWorkout);

    const storedPrograms = JSON.parse(localStorage.getItem('workout') || '[]');
    expect(storedPrograms.length).toBe(1);
    expect(storedPrograms[0]).toEqual(mockWorkout);
  });

  it('should retrieve stored programs from local storage', () => {
    localStorage.setItem('workout', JSON.stringify(mockWorkout));

    const retrievedPrograms = service.getWorkouts();
    expect(retrievedPrograms.length).toBe(2);
    expect(retrievedPrograms).toEqual(mockWorkout);
  });

  it('should return an empty array if nos programs are stored', () => {
    const retrievedPrograms = service.getWorkouts();
    expect(retrievedPrograms).toEqual([]);
  });
});
