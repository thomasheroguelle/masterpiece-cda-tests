import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercicesComponent } from './exercices.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ExercicesService } from '../../services/json-web-server/exercices.service';
import { of } from 'rxjs';

describe('ExercicesComponent', () => {
  let component: ExercicesComponent;
  let fixture: ComponentFixture<ExercicesComponent>;
  let mockExercicesService: jasmine.SpyObj<ExercicesService>;

  beforeEach(async () => {
    mockExercicesService = jasmine.createSpyObj('ExercicesService', [
      'getExercices',
    ]);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],

      declarations: [ExercicesComponent],

      providers: [
        { provide: ExercicesService, useValue: mockExercicesService }, // Injection du mock
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExercicesComponent);
    component = fixture.componentInstance;
  });

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
    const mockExercices = [
      {
        id: '1',
        name: 'Pompes',
        instructions: 'Commencez en position de planche...',
        type: 'Poids du corps',
        difficultyLevel: 'Intermédiaire',
        bodypart: ['Poitrine', 'Triceps', 'Épaules'],
        gifUrl: 'assets/exercices/pushup.jpg',
        secondaryMuscles: ['Core', 'Bas du dos'],
        equipment: 'Poids du corps',
        steps: [
          'Positionnez vos mains un peu plus larges que vos épaules.',
          'Abaissez votre corps en fléchissant les coudes.',
          'Poussez avec vos bras pour revenir à la position de départ.',
        ],
      },
    ];

    mockExercicesService.getExercices.and.returnValue(of(mockExercices));

    fixture.detectChanges(); // lance ngOnInit

    expect(component.exercices).toEqual(mockExercices);
  });
});
