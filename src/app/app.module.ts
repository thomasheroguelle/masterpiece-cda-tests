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
import { WorkoutHistoryComponent } from './components/workout-history/workout-history.component';
import { WorkoutControlMenuComponent } from './components/workout-control-menu/workout-control-menu.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UpdateWorkoutComponent } from './components/update-workout/update-workout.component';
import { ProgramsComponent } from './components/programs/programs.component';
import { ProgramDetailComponent } from './components/program-detail/program-detail.component';

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
    WorkoutHistoryComponent,
    WorkoutControlMenuComponent,
    UpdateWorkoutComponent,
    ProgramsComponent,
    ProgramDetailComponent,
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
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
  providers: [
    provideHttpClient(),
    provideAnimations(),
    providePrimeNG({}),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
