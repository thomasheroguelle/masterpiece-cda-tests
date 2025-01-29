import { Component } from '@angular/core';
import { Exercices } from '../../../interfaces/Exercices';
import { ExercicesService } from '../../services/json-web-server/exercices.service';

@Component({
  selector: 'app-exercices',
  templateUrl: './exercices.component.html',
  styleUrl: './exercices.component.css'
})
export class ExercicesComponent {
  exercices!: Exercices[];

  constructor(private exercicesService: ExercicesService) { }

  ngOnInit() {
    this.getExerciceList();
  }

  getExerciceList() {
    this.exercicesService.getExercices().subscribe((data) => {
      this.exercices = data;
      console.log(data);

    })
  }
}
