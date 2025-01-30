import { Component } from '@angular/core';
import { Exercices } from '../../../interfaces/Exercices';
import { ExercicesService } from '../../services/json-web-server/exercices.service';
import { CarouselResponsiveOptions } from 'primeng/carousel';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent {
  exercices: Exercices[] = [];
  responsiveOptions;

  constructor(private readonly exercicesService: ExercicesService) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnInit() {
    this.exercicesService.getExercices().subscribe({
      next: (data) => {
        console.log('exercices', data);
        this.exercices = data;
      },
    });
  }
}
