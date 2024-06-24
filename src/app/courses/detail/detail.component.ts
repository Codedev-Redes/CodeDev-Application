import { Component } from '@angular/core';
import { CourseId, ModulesId } from '../interfaces/auth.interface';
import { CourseService } from '../services/course.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  course?: CourseId;
  modules: ModulesId[] = [];

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe({
      next: (params) => {
        console.log(params['id']);
        this.courseService.getCourseById(params['id'])
        .subscribe({
          next: (course) => {
            this.course = course;
            if (course) {
              this.courseService.getModulesByCourseId(course._id)
              .subscribe({
                next: (modules) => {
                  this.modules = modules;
                },
                error: (error) => {
                  console.error('Error al obtener los modulos', error);
                }
              });
            }
          },
          error: (error) => {
            console.error('Error al obtener el curso', error);
          }
        });
      }
    });
  }
}
