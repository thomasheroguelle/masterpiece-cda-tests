import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProgramComponent } from './new-program.component';
import { ProgramService } from '../../services/local-storage/program.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Program } from '../../../interfaces/Program';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('NewProgramComponent', () => {
  let component: NewProgramComponent;
  let fixture: ComponentFixture<NewProgramComponent>;
  let programService: jasmine.SpyObj<ProgramService>;

  beforeEach(async () => {
    programService = jasmine.createSpyObj('ProgramService', ['saveProgram']);
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],

      declarations: [NewProgramComponent],
      providers: [
        FormBuilder,
        { provide: ProgramService, useValue: programService },
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
});
