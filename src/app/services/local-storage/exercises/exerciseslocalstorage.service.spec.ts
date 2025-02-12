import { TestBed } from '@angular/core/testing';
import { ExercisesLocalStorageService } from './exerciseslocalstorage.service';
import { Bodyparts, Exercices } from '../../../../interfaces/Exercices';
import { Serie } from '../../../../interfaces/Serie';

describe('ExercicesService', () => {
  let service: ExercisesLocalStorageService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExercisesLocalStorageService);
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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create new exercise', () => {
    localStorage.setItem('exercices', JSON.stringify([mockExercice]));
    service.saveExercice([mockExercice]);
    const storedExercise = JSON.parse(localStorage.getItem('exercice') || '[]');
    expect(storedExercise.length).toBe(1);
  });

  it('should get exercise', () => {
    localStorage.setItem('exercice', JSON.stringify([mockExercice]));
    const exercises = service.getExercices();
    expect(exercises.length).toBe(1);
  });

  it('should delete exercise from local storage', () => {
    localStorage.setItem('exercices', JSON.stringify([mockExercice]));
    service.deleteExercice(mockExercice.id);
    const storedExercise = JSON.parse(localStorage.getItem('exercice') || '[]');
    expect(storedExercise.length).toBe(0);
  });

  it('should add a serie', () => {
    service.exercices = [mockExercice];
    service.addSerie(mockExercice.id, mockSerie);

    const updatedExercise = service.exercices.find((e) => e.id === '1');
    expect(updatedExercise?.series.length).toBe(2);
    expect(updatedExercise?.series).toContain(mockSerie);
  });
});
