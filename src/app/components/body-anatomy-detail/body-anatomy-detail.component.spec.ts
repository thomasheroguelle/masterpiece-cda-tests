import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyAnatomyDetailComponent } from './body-anatomy-detail.component';

describe('BodyAnatomyDetailComponent', () => {
  let component: BodyAnatomyDetailComponent;
  let fixture: ComponentFixture<BodyAnatomyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BodyAnatomyDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BodyAnatomyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
