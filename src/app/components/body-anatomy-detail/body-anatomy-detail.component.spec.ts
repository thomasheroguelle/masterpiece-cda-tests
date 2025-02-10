import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BodyAnatomyDetailComponent } from './body-anatomy-detail.component';
import { Bodyparts, Exercices } from '../../../interfaces/Exercices';
import { ExercicesService } from '../../services/json-web-server/exercices.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('BodyAnatomyDetailComponent', () => {
  let component: BodyAnatomyDetailComponent;
  let fixture: ComponentFixture<BodyAnatomyDetailComponent>;
  let exercicesService: jasmine.SpyObj<ExercicesService>;
  let router: jasmine.SpyObj<Router>;

  const mockExercice: Exercices[] = [
    {
      id: '1',
      name: 'Développé couché avec haltères',
      bodypart: [Bodyparts.Poitrine],
      instructions: "Allongez-vous sur un banc avec un haltère dans chaque main, poussez les haltères vers le haut jusqu'à ce que vos bras soient complètement tendus, puis abaissez les haltères au niveau de la poitrine.",
      type: "Haltérophilie",
      difficultyLevel: "Intermédiaire",
      equipment: "Poids",
      secondaryMuscles: ["Avant-bras"],
      gifUrl: "assets/exercices/developpe-couche-halteres-exercice-musculation.jpg",
      steps: [
        "Allongez-vous sur un banc avec un haltère dans chaque main.",
        "Poussez les haltères vers le haut jusqu'à ce que vos bras soient tendus.",
        "Abaissez les haltères jusqu'à la poitrine.",
        "Relevez les haltères pour revenir à la position de départ."
      ],
    },
    {
      id: '2',
      name: 'Pompes',
      bodypart: [Bodyparts.Poitrine],
      instructions: "Commencez en position de planche avec les mains placées légèrement plus larges que la largeur des épaules. Abaissez votre corps jusqu'à ce que votre poitrine touche presque le sol, puis poussez vers le haut.",
      type: "Poids du corps",
      difficultyLevel: "Intermédiaire",
      equipment: "Poids du corps",
      secondaryMuscles: ["Core", "Bas du dos"],
      gifUrl: "assets/exercices/pushup.jpg",
      steps: [
        "Positionnez vos mains un peu plus larges que vos épaules.",
        "Abaissez votre corps en fléchissant les coudes.",
        "Poussez avec vos bras pour revenir à la position de départ."
      ],
    },
  ];

  beforeEach(async () => {
    const exercicesServiceMock = jasmine.createSpyObj('ExercicesService', ['getExercices', 'getExerciceById']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    exercicesServiceMock.getExercices.and.returnValue(of(mockExercice));
    exercicesServiceMock.getExerciceById.and.returnValue(of(mockExercice[0]));

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [BodyAnatomyDetailComponent],
      providers: [
        { provide: ExercicesService, useValue: exercicesServiceMock },
        {
          provide: ActivatedRoute,
          useValue: { params: of({ bodypart: 'Poitrine' }) },
        },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BodyAnatomyDetailComponent);
    component = fixture.componentInstance;
    exercicesService = TestBed.inject(ExercicesService) as jasmine.SpyObj<ExercicesService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter exercises based on bodypart', () => {
    component.loadExercises();

    expect(component.filteredExercises.length).toBe(2);
    expect(component.filteredExercises[0].name).toBe('Développé couché avec haltères');
  });

  it('should get exercise detail', () => {
    component.exerciceDetail('1');
    expect(component.exerciceID?.name).toBe('Développé couché avec haltères');
  });
});
