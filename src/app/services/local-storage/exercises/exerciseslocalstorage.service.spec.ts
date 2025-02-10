import { TestBed } from '@angular/core/testing';
import { ExercisesLocalStorageService } from './exerciseslocalstorage.service';

describe('ExercicesService', () => {
  let service: ExercisesLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExercisesLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
