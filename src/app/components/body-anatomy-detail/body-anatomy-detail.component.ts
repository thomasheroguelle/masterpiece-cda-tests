import { Component } from '@angular/core';
import { Bodyparts, Exercices } from '../../../interfaces/Exercices';
import { ActivatedRoute, Router } from '@angular/router';
import { ExercicesDbService } from '../../services/json-web-server/exercises/exercicesdb.service';

@Component({
  selector: 'app-body-anatomy-detail',
  templateUrl: './body-anatomy-detail.component.html',
  styleUrl: './body-anatomy-detail.component.css',
})
export class BodyAnatomyDetailComponent {
  exercices?: Exercices[] = [];
  bodypart!: Bodyparts;
  filteredExercises: Exercices[] = [];
  exerciceID?: Exercices;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly exercicesService: ExercicesDbService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.bodypart = params['bodypart'] as Bodyparts;
      console.log('bodypart : ', this.bodypart);

      this.loadExercises();
    });
  }

  loadExercises() {
    this.exercicesService.getExercices().subscribe((data) => {
      this.exercices = data;

      this.filteredExercises = this.exercices.filter((exercice) =>
        exercice.bodypart.includes(this.bodypart),
      );
      console.log(this.filteredExercises);
    });
  }

  exerciceDetail(exerciceID: string) {
    this.exercicesService.getExerciceById(exerciceID).subscribe((exercice) => {
      this.exerciceID = exercice;
    });
    this.router.navigate(['exercice', exerciceID]);
  }
}
