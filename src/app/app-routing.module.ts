import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExercicesComponent } from './components/exercices/exercices.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExerciceDetailComponent } from './components/exercice-detail/exercice-detail.component';
import { BodyAnatomyComponent } from './components/body-anatomy/body-anatomy.component';
import { BodyAnatomyDetailComponent } from './components/body-anatomy-detail/body-anatomy-detail.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'exercices', component: ExercicesComponent },
  { path: 'exercice/:id', component: ExerciceDetailComponent },
  { path: 'body-anatomy', component: BodyAnatomyComponent },
  { path: 'body-anatomy/:bodypart', component: BodyAnatomyDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
