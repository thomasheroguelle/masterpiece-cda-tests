import { Injectable } from '@angular/core';
import { Program } from '../../../interfaces/Program';

@Injectable({
  providedIn: 'root',
})
export class ProgramService {
  private readonly storageKey = 'program';

  constructor() {}

  saveProgram(program: Program) {
    const programs = this.getPrograms();
    programs.push(program);
    localStorage.setItem(this.storageKey, JSON.stringify(programs));
  }

  getPrograms(): Program[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }
}
