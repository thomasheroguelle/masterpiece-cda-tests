import { Component } from '@angular/core';
import { ProgramService } from '../../services/local-storage/program.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Program } from '../../../interfaces/Program';

@Component({
  selector: 'app-new-program',
  templateUrl: './new-program.component.html',
  styleUrl: './new-program.component.css',
})
export class NewProgramComponent {
  programForm: FormGroup;

  constructor(
    private readonly programService: ProgramService,
    private readonly fb: FormBuilder,
  ) {
    this.programForm = this.fb.group({
      programName: ['', Validators.required],
      programDescription: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.programForm.valid) {
      const newProgram: Program = {
        name: this.programForm.value.programName,
        description: this.programForm.value.programDescription,
      };
      console.log(newProgram);
      this.programService.saveProgram(newProgram);
      this.programForm.reset();
    }
  }
}
