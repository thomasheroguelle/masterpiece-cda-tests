import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramDetailComponent } from './program-detail.component';

describe('ProgramDetalComponent', () => {
  let component: ProgramDetailComponent;
  let fixture: ComponentFixture<ProgramDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgramDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgramDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
