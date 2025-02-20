import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExercicesComponent } from './components/exercices/exercices.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExerciceDetailComponent } from './components/exercice-detail/exercice-detail.component';
import { BodyAnatomyComponent } from './components/body-anatomy/body-anatomy.component';
import { BodyAnatomyDetailComponent } from './components/body-anatomy-detail/body-anatomy-detail.component';
import { NewWorkoutComponent } from './components/new-workout/new-workout.component';
import { WorkoutHistoryComponent } from './components/workout-history/workout-history.component';
import { UpdateWorkoutComponent } from './components/update-workout/update-workout.component';
import { ProgramsComponent } from './components/programs/programs.component';
import { ProgramDetailComponent } from './components/program-detal/program-detail.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'exercices', component: ExercicesComponent },
  { path: 'exercice/:id', component: ExerciceDetailComponent },
  { path: 'body-anatomy', component: BodyAnatomyComponent },
  { path: 'body-anatomy/:bodypart', component: BodyAnatomyDetailComponent },
  { path: 'new-workout', component: NewWorkoutComponent },
  { path: 'history', component: WorkoutHistoryComponent },
  { path: 'update/:id', component: UpdateWorkoutComponent },
  { path: 'programs', component: ProgramsComponent },
  { path: 'program/:id', component: ProgramDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
