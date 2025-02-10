import { TestBed } from '@angular/core/testing';

import { ProgramLocalStorageService } from './programlocalstorage.service';
import { Program } from '../../../../interfaces/Program';

describe('ProgramService', () => {
  let service: ProgramLocalStorageService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save a program in local storage', () => {
    const mockProgram = {
      name: 'Test Program',
      description: 'Test Program Description',
    };
    service.saveProgram(mockProgram);

    const storedPrograms = JSON.parse(localStorage.getItem('program') || '[]');
    expect(storedPrograms.length).toBe(1);
    expect(storedPrograms[0]).toEqual(mockProgram);
  });

  it('should retrieve stored programs from local storage', () => {
    const mockProgram: Program[] = [
      { name: 'Test Program', description: 'Test Program Description' },
      { name: 'Program 2', description: 'Description 2' },
    ];

    localStorage.setItem('program', JSON.stringify(mockProgram));

    const retrievedPrograms = service.getPrograms();
    expect(retrievedPrograms.length).toBe(2);
    expect(retrievedPrograms).toEqual(mockProgram);
  });

  it('should return an empty array if nos programs are stored', () => {
    const retrievedPrograms = service.getPrograms();
    expect(retrievedPrograms).toEqual([]);
  });
});
