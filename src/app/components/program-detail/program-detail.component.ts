import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Program } from '../../../interfaces/Program';
import { ProgramsService } from '../../services/programs.service';

@Component({
  selector: 'app-program-detail',
  templateUrl: './program-detail.component.html',
  styleUrl: './program-detail.component.css',
})
export class ProgramDetailComponent {
  program?: Program;
  programId!: string;

  constructor(
    private route: ActivatedRoute,
    private programService: ProgramsService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.programId = params['id'];
      console.log('id', this.programId);

      this.programService
        .getProgramById(this.programId)
        .subscribe((program) => {
          this.program = program;
          console.log(this.program);
        });
    });
  }
}
