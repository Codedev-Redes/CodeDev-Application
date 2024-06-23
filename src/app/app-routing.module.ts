import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./student/student.module').then(m => m.StudentModule) },
  { path: 'records', loadChildren: () => import('./records/records.module').then(m => m.RecordsModule) } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
