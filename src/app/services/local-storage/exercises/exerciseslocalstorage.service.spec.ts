import { TestBed } from '@angular/core/testing';
import { ExercisesLocalStorageService } from './exerciseslocalstorage.service';
import { Bodyparts, Exercices } from '../../../../interfaces/Exercices';

describe('ExercicesService', () => {
  let service: ExercisesLocalStorageService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExercisesLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should delete exercise from local storage', () => {
    const mockExercices = {
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
    };
    localStorage.setItem('exercices', JSON.stringify([mockExercices]));
    service.deleteExercice(mockExercices.id);
    const storedExercise = JSON.parse(localStorage.getItem('exercice') || '[]');
    expect(storedExercise.length).toBe(0);
  });
});
