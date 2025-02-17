import { TestBed } from '@angular/core/testing';

import { ProgramsService } from './programs.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProgramsService', () => {
  let service: ProgramsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });

    service = TestBed.inject(ProgramsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
