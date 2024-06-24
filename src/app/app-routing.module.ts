import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./student/student.module').then(m => m.StudentModule) },
  { path: 'records', loadChildren: () => import('./records/records.module').then(m => m.RecordsModule) },
  { path: 'courses', loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
