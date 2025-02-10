import { Component } from '@angular/core';
import { ProgramLocalStorageService } from '../../services/local-storage/program/programlocalstorage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Program } from '../../../interfaces/Program';
import { Exercices } from '../../../interfaces/Exercices';
import { ExercisesLocalStorageService } from '../../services/local-storage/exercises/exerciseslocalstorage.service';

@Component({
  selector: 'app-new-program',
  templateUrl: './new-program.component.html',
  styleUrl: './new-program.component.css',
})
export class NewProgramComponent {
  programForm: FormGroup;
  exercices?: Exercices[];

  constructor(
    private readonly programLocalStorageService: ProgramLocalStorageService,
    private readonly exercicesLocalStorageService: ExercisesLocalStorageService,
    private readonly fb: FormBuilder,
  ) {
    this.programForm = this.fb.group({
      programName: ['', Validators.required],
      programDescription: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.exercicesLocalStorageService.getExercices();
    this.exercicesLocalStorageService.exercices$.subscribe((exercices) => {
      this.exercices = exercices;
    });
  }

  onSubmit() {
    if (this.programForm.valid) {
      const newProgram: Program = {
        name: this.programForm.value.programName,
        description: this.programForm.value.programDescription,
      };
      console.log(newProgram);
      this.programLocalStorageService.saveProgram(newProgram);
      this.programForm.reset();
    }
  }
}
