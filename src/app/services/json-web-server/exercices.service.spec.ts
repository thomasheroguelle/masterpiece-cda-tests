import { TestBed } from '@angular/core/testing';

import { ExercicesService } from './exercices.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../../environment/environment';
import { Bodyparts, Exercices } from '../../../interfaces/Exercices';

describe('ExercicesService', () => {
  let service: ExercicesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    // fonction exécutée avant chaque test (chaque it), garantit que les tests sont a chzque fois réintialisé pour eviter toute interference
    TestBed.configureTestingModule({
      // TestBed c'est l'outil fourni par Angular pour configurer et initialiser son environnement de test
      imports: [HttpClientTestingModule], // ExercicesService utilise httpClient pour effectuer des requetes, HttpClientTestingModule remplace HttpClient par une version mockée qui intercepte les requetes et test leur comportement
      providers: [ExercicesService], // Fournit une instance du service ExercicesServie
    });
    service = TestBed.inject(ExercicesService); // intercepte et simule des réponses
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // vérifie qu'il n''y a pas de requete en attente
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /*
  Le service est responsable de récupérer les données à partir d'une API ou d'une source de données. Ce test vérifie le comportement du srevice, en particulier l'appel à l'API et la gestion des réponses. 
  On vérifie que le service peut etre instancié correctement. 
  On test que le service appelle bien l'API via getExercices() et que la réponse retournée correspond à celle qu'on attend. 

      - service.getExercices().subscribe((res) => { expect(res).toEqual(mockExercises); }) : On vérifie que le tableau des exercices retourné par le service correspond à ce qu'on a mocké.
      - httpMock.expectOne(environment.LOCAL_DB); : Cette ligne s'assure qu'une seule requête a été envoyée à l'URL attendue.
      -  expect(req.request.method).toBe('GET'); : On vérifie que la méthode de la requête HTTP est bien GET.
      - req.flush(mockExercises); : On simule une réponse de l'API avec les exercices mockés.

  */
  it('should call getExercices and return an array of Exercices', () => {
    const mockExercises: Exercices[] = [
      // on mock
      {
        id: '1',
        name: 'Pompes',
        instructions: 'Commencez en position de planche...',
        type: 'Poids du corps',
        difficultyLevel: 'Intermédiaire',
        bodypart: [Bodyparts.Poitrine, Bodyparts.Triceps, Bodyparts.Épaules],

        gifUrl: 'assets/exercices/pushup.jpg',
        secondaryMuscles: ['Core', 'Bas du dos'],
        equipment: 'Poids du corps',
        steps: [
          'Positionnez vos mains un peu plus larges que vos épaules.',
          'Abaissez votre corps en fléchissant les coudes.',
          'Poussez avec vos bras pour revenir à la position de départ.',
        ],
      },
    ];
    service.getExercices().subscribe((res) => {
      expect(res).toEqual(mockExercises); // on s'attend à ce que l'appel à getExercices soit egal au mock
    });

    const req = httpMock.expectOne(environment.LOCAL_DB); // on précise l'url de notre requete
    expect(req.request.method).toBe('GET'); // on s'attend a ce que la requete soit de type GET
    req.flush(mockExercises); // simule une réponse
  });

  it('should call getExerciceById and return the correct exercice', () => {
    const mockExercice = {
      id: '1',
      name: 'Pompes',
      instructions: 'Commencez en position de planche...',
      type: 'Poids du corps',
      difficultyLevel: 'Intermédiaire',
      bodypart: [Bodyparts.Poitrine, Bodyparts.Triceps, Bodyparts.Épaules],
      gifUrl: 'assets/exercices/pushup.jpg',
      secondaryMuscles: ['Core', 'Bas du dos'],
      equipment: 'Poids du corps',
      steps: [
        'Positionnez vos mains un peu plus larges que vos épaules.',
        'Abaissez votre corps en fléchissant les coudes.',
        'Poussez avec vos bras pour revenir à la position de départ.',
      ],
    };
    service.getExerciceById(mockExercice.id).subscribe((res) => {
      expect(res).toEqual(mockExercice);
    });

    const req = httpMock.expectOne(
      `${environment.LOCAL_DB}/${mockExercice.id}`,
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockExercice);
  });
});
