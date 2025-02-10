import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Exercices } from '../../../interfaces/Exercices';
import { ExercicesService } from '../../services/json-web-server/exercices.service';
import { Bodyparts } from '../../../interfaces/Exercices';

@Component({
  selector: 'app-body-anatomy',
  templateUrl: './body-anatomy.component.html',
  styleUrl: './body-anatomy.component.css',
})
export class BodyAnatomyComponent {
  exercices?: Exercices[] = [];

  constructor(
    private readonly route: Router,
    private readonly exercicesService: ExercicesService,
  ) {}

  ngOnInit() {
    this.exercicesService.getExercices().subscribe((data) => {
      this.exercices = data;
    });
  }

  redirectToMusclePage(name: string) {
    const isMuscleValid = this.exercices?.some((exercice) =>
      exercice.bodypart.includes(name as Bodyparts),
    );

    if (isMuscleValid) {
      this.route.navigate(['body-anatomy', name]);
    } else {
      console.error('Une erreur est survenue : muscle invalide');
    }
  }
}
