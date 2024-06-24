import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CategoriesComponent } from './categories/categories.component';
import { CourseComponent } from './course/course.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  { path: '', component: CourseComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: ':id', component: DetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
