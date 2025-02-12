import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExercicesComponent } from './components/exercices/exercices.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { CarouselModule } from 'primeng/carousel';
import { provideHttpClient } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import { ExerciceDetailComponent } from './components/exercice-detail/exercice-detail.component';
import { BodyAnatomyComponent } from './components/body-anatomy/body-anatomy.component';
import { BodyAnatomyDetailComponent } from './components/body-anatomy-detail/body-anatomy-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PopupComponent } from './components/popup/popup.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NewWorkoutComponent } from './components/new-workout/new-workout.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ExercicesComponent,
    DashboardComponent,
    CarouselComponent,
    ExerciceDetailComponent,
    BodyAnatomyComponent,
    BodyAnatomyDetailComponent,
    PopupComponent,
    NewWorkoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CarouselModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
  ],
  providers: [provideHttpClient(), provideAnimations(), providePrimeNG({})],
  bootstrap: [AppComponent],
})
export class AppModule {}
