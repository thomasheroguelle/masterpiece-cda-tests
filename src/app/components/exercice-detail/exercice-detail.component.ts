import { Component } from '@angular/core';
import { Exercices } from '../../../interfaces/Exercices';
import { ExercicesService } from '../../services/json-web-server/exercices.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exercice-detail',
  templateUrl: './exercice-detail.component.html',
  styleUrl: './exercice-detail.component.css',
})
export class ExerciceDetailComponent {
  exercice?: Exercices;
  exerciceID!: string;

  constructor(
    private readonly exerciceService: ExercicesService,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.exerciceID = params['id'];
      console.log('id:', this.exerciceID);

      this.exerciceService
        .getExerciceById(this.exerciceID)
        .subscribe((exercice) => {
          this.exercice = exercice;
          console.log('Exercice: ', this.exercice);
        });
    });
  }
}
