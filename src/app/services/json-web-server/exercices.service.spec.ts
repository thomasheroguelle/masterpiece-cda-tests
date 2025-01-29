import { TestBed } from '@angular/core/testing';

import { ExercicesService } from './exercices.service';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../environment/environment';
import { Exercices } from '../../../interfaces/Exercices';

describe('ExercicesService', () => {
  let service: ExercicesService;
  let httpMock: HttpTestingController;

  beforeEach(() => { // fonction exécutée avant chaque test (chaque it), garantit que les tests sont a chzque fois réintialisé pour eviter toute interference 
    TestBed.configureTestingModule({ // TestBed c'est l'outil fourni par Angular pour configurer et initialiser son environnement de test
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

  it('should call getExercices and return an array of Exercices', () => {
    const mockExercises: Exercices[] = [ // on mock 
      {
        id: "id",
        name: 'Pompes',
        instructions: 'Commencez en position de planche...',
        type: 'Poids du corps',
        difficultyLevel: 'Intermédiaire',
        bodypart: ['Poitrine', 'Triceps', 'Épaules'],
        gifUrl: 'assets/exercices/pushup.jpg',
        secondaryMuscles: ['Core', 'Bas du dos'],
        equipment: 'Poids du corps',
      }
    ]
    service.getExercices().subscribe((res) => {
      expect(res).toEqual(mockExercises) // on s'attend à ce que l'appel à getExercices soit egal au mock 
    });

    const req = httpMock.expectOne(environment.LOCAL_DB); // on précise l'url de notre requete
    expect(req.request.method).toBe('GET'); // on s'attend a ce que la requete soit de type GET
    req.flush(mockExercises) // simule une réponse
  })
});
