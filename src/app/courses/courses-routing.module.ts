import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { CourseComponent } from './course/course.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  { path: '', component: CourseComponent },
  { path: ':id', component: DetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
