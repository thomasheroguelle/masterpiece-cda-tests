import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProgramComponent } from './new-program.component';
import { ProgramLocalStorageService } from '../../services/local-storage/program/programlocalstorage.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Program } from '../../../interfaces/Program';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PopupComponent } from '../popup/popup.component';
import { Bodyparts } from '../../../interfaces/Exercices';

describe('NewProgramComponent', () => {
  let component: NewProgramComponent;
  let fixture: ComponentFixture<NewProgramComponent>;
  let programService: jasmine.SpyObj<ProgramLocalStorageService>;

  beforeEach(async () => {
    programService = jasmine.createSpyObj('ProgramService', ['saveProgram']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],

      declarations: [NewProgramComponent, PopupComponent],
      providers: [
        FormBuilder,
        { provide: ProgramLocalStorageService, useValue: programService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create new program with a name and a description saved in local storage', () => {
    const mockProgram: Program = {
      name: 'Hello',
      description: 'World',
    };

    component.programForm.setValue({
      programName: mockProgram.name,
      programDescription: mockProgram.description,
    });

    component.onSubmit();

    expect(programService.saveProgram).toHaveBeenCalledWith(mockProgram);
  });

  it('should delete an exercise from the program', () => {
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
    component.exercices = [mockExercices];
    component.deleteExercise(mockExercices);
    expect(component.exercices.length).toBe(0);
  });
});
