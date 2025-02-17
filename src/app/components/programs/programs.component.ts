import { Component } from '@angular/core';
import { ProgramsService } from '../../services/programs.service';
import { Program } from '../../../interfaces/Program';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.css',
})
export class ProgramsComponent {
  programs!: Program[];

  constructor(private readonly programService: ProgramsService) {}

  ngOnInit() {
    this.programService.getPrograms().subscribe((data: Program[]) => {
      this.programs = data;
      console.log(data);
    });
  }
}
