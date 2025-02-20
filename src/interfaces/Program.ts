import { Exercices } from './Exercices';

export interface Program {
  id: string;
  name: string;
  description: string;
  trainingDays: TrainingDay[];
  trainingDaysCount: number;
}

export interface TrainingDay {
  day: string;
  exercices: Exercices[];
}
