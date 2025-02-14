import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutControlMenuComponent } from './workout-control-menu.component';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

describe('WorkoutControlMenuComponent', () => {
  let component: WorkoutControlMenuComponent;
  let fixture: ComponentFixture<WorkoutControlMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkoutControlMenuComponent],
      imports: [MatIcon, MatMenuModule],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutControlMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
