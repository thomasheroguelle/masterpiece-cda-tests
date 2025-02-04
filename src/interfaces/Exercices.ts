export interface Exercices {
  id: string;
  name: string;
  instructions: string;
  type: string;
  difficultyLevel: string;
  bodypart: Bodyparts[];
  equipment: string;
  secondaryMuscles: string[];
  gifUrl: string;
  steps: string[];
}

export enum Bodyparts {
  Poitrine = 'Poitrine',
  Triceps = 'Triceps',
  Épaules = 'Épaules',
  Jambes = 'Jambes',
  Fessiers = 'Fessiers',
  Avant_bras = 'Avant_bras',
  Dos = 'Dos',
  Biceps = 'Biceps',
  Cou = 'Cou',
  Core = 'Ceinture',
}
