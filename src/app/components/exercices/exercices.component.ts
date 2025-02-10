import { Component } from '@angular/core';
import { Exercices } from '../../../interfaces/Exercices';
import { ExercicesDbService } from '../../services/json-web-server/exercises/exercicesdb.service';

@Component({
  selector: 'app-exercices',
  templateUrl: './exercices.component.html',
  styleUrl: './exercices.component.css',
})
export class ExercicesComponent {
  exercices!: Exercices[];

  constructor(private readonly exercicesService: ExercicesDbService) {}

  ngOnInit() {
    this.getExerciceList();
  }

  getExerciceList() {
    this.exercicesService.getExercices().subscribe((data) => {
      this.exercices = data;
      console.log(data);
    });
  }
}
