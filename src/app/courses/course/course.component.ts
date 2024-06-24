import { Router } from '@angular/router';
import { CourseService } from '../services/course.service';
import { Course, CourseId } from './../interfaces/auth.interface';
import { Component } from '@angular/core';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {

  courses: CourseId[] = [];

  constructor(
    private courseService: CourseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.courseService.getCourses()
    .subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      error: (error) => {
        console.error('Error al obtener los cursos', error);
      }
    });
  }

  goToCourse(course: CourseId) {
    this.router.navigate(['/courses'], {queryParams: {id: course._id}});
  }
}
