import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyAnatomyComponent } from './body-anatomy.component';

describe('BodyAnatomyComponent', () => {
  let component: BodyAnatomyComponent;
  let fixture: ComponentFixture<BodyAnatomyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BodyAnatomyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BodyAnatomyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
