import { Exercices } from './Exercices';

export interface Workout {
  id: string;
  name: string;
  description: string;
  exercices: Exercices[];
}
