import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercicesComponent } from './exercices.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ExercicesDbService } from '../../services/json-web-server/exercises/exercicesdb.service';
import { of } from 'rxjs';
import { Bodyparts, Exercices } from '../../../interfaces/Exercices';
import { Serie } from '../../../interfaces/Serie';

describe('ExercicesComponent', () => {
  let component: ExercicesComponent;
  let fixture: ComponentFixture<ExercicesComponent>;
  let mockExercicesService: jasmine.SpyObj<ExercicesDbService>;

  beforeEach(async () => {
    mockExercicesService = jasmine.createSpyObj('ExercicesService', [
      'getExercices',
    ]);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],

      declarations: [ExercicesComponent],

      providers: [
        { provide: ExercicesDbService, useValue: mockExercicesService }, // Injection du mock
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExercicesComponent);
    component = fixture.componentInstance;
  });

  const mockSerie: Serie = {
    id: '1',
    serieNumber: 1,
    repetitions: 10,
    weight: 20,
  };

  const mockExercice: Exercices[] = [
    {
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
    },
  ];

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*
  Ici, on cherche à vérifier que le composant a été créé correctement. 
  On s'assure que le composant existe et a bien été instancié. 
  On veut tester que lorsque le composant appelle le service pour récupérer les exercices, ceux ci sont effectivement retournés et stockés dans la propriété "exercices" du composant. 
             
      - mockExercicesService.getExercices.and.returnValue(of(mockExercices)); : On simule le comportement du service en retournant une liste d'exercices factices.   
      - fixture.detectChanges(); : Cette ligne déclenche le cycle de détection des changements, ce qui simule l'appel au service dans le ngOnInit du composant.
      - expect(component.exercices).toEqual(mockExercices); : On vérifie que les exercices récupérés par le service sont bien affectés à la propriété exercices du composant.
  */
  it('should call getExercices and display exercices', () => {
    mockExercicesService.getExercices.and.returnValue(of(mockExercice));

    fixture.detectChanges(); // lance ngOnInit

    expect(component.exercices).toEqual(mockExercice);
  });
});
