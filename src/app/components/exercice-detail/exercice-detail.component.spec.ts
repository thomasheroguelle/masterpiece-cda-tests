import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExerciceDetailComponent } from './exercice-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ExercicesDbService } from '../../services/json-web-server/exercises/exercicesdb.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Bodyparts, Exercices } from '../../../interfaces/Exercices';
import { Serie } from '../../../interfaces/Serie';

describe('ExerciceDetailComponent', () => {
  let component: ExerciceDetailComponent;
  let fixture: ComponentFixture<ExerciceDetailComponent>;
  let mockExercicesServices: jasmine.SpyObj<ExercicesDbService>;

  beforeEach(async () => {
    mockExercicesServices = jasmine.createSpyObj('ExercicesService', [
      'getExerciceById',
    ]);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [ExerciceDetailComponent],
      providers: [
        // Simuler ActivatedRoute pour renvoyer un id
        { provide: ActivatedRoute, useValue: { params: of({ id: '1' }) } },
        // Fournir le mock de ExercicesService
        { provide: ExercicesDbService, useValue: mockExercicesServices },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExerciceDetailComponent);
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getExerciceById and return the appropriate exercice', () => {
    mockExercicesServices.getExerciceById.and.returnValue(of(mockExercice));

    component.ngOnInit();

    expect(mockExercicesServices.getExerciceById).toHaveBeenCalledWith('1');
    expect(component.exercice).toEqual(mockExercice);
  });
});
