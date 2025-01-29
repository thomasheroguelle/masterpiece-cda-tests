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
    mockExercicesService = jasmine.createSpyObj('ExercicesService', ['getExercices']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],

      declarations: [ExercicesComponent],

      providers: [
        { provide: ExercicesService, useValue: mockExercicesService }, // Injection du mock
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ExercicesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getExercices and display exercices', () => {
    const mockExercices = [
      {
        id: "id",
        name: 'Pompes',
        instructions: 'Commencez en position de planche...',
        type: 'Poids du corps',
        difficultyLevel: 'Intermédiaire',
        bodypart: ['Poitrine', 'Triceps', 'Épaules'],
        gifUrl: 'assets/exercices/pushup.jpg',
        secondaryMuscles: ['Core', 'Bas du dos'],
        equipment: 'Poids du corps',
      }
    ];

    mockExercicesService.getExercices.and.returnValue(of(mockExercices));

    fixture.detectChanges(); // lance ngOnInit

    expect(component.exercices).toEqual(mockExercices);

  })
});
