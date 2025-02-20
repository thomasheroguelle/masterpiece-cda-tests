import { Component } from '@angular/core';
import { ProgramsService } from '../../services/programs.service';
import { Program } from '../../../interfaces/Program';
import { Router } from '@angular/router';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.css',
})
export class ProgramsComponent {
  programs!: Program[];

  constructor(
    private readonly programService: ProgramsService,
    private readonly route: Router,
  ) {}

  ngOnInit() {
    this.programService.getPrograms().subscribe((data: Program[]) => {
      this.programs = data;
      console.log(data);
    });
  }

  goToDetail(id: string) {
    this.route.navigate(['program', id]);
  }
}
