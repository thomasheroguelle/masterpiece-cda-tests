import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyAnatomyComponent } from './body-anatomy.component';
import { HttpClientModule } from '@angular/common/http';

describe('BodyAnatomyComponent', () => {
  let component: BodyAnatomyComponent;
  let fixture: ComponentFixture<BodyAnatomyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
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
