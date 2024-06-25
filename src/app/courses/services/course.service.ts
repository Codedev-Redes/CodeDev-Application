import { Course, CourseId, ModulesId } from './../interfaces/auth.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private http: HttpClient
  ) { }

  getCourses(): Observable<CourseId[]> {
    return this.http.get<CourseId[]>(`${environment.apiURL}/courses`)
      .pipe(
        catchError((error) => {
          console.error('Error al obtener el estudiante por email', error);
          throw error;
        }
      )
    );
  }

  getCourseById(id: string): Observable<CourseId> {
    return this.http.get<CourseId>(`${environment.apiURL}/courses/${id}`)
      .pipe(
        catchError((error) => {
          console.error('Error al obtener el curso por id', error);
          throw error;
        }
      )
    );
  }

  getModulesByCourseId(id: string): Observable<ModulesId[]> {
    return this.http.get<ModulesId[]>(`${environment.apiURL}/modules/${id}/courses`)
      .pipe(
        catchError((error) => {
          console.error('Error al obtener los modulos por curso_id', error);
          throw error;
        }
      )
    );
  }

  getCategories(): Observable<CourseId[]> {
    return this.http.get<CourseId[]>(`${environment.apiURL}/categories`)
      .pipe(
        catchError((error) => {
          console.error('Error al obtener las categorias', error);
          throw error;
        }
      )
    );
  }

  getCategorieById(id: string): Observable<CourseId> {
    return this.http.get<CourseId>(`${environment.apiURL}/categories/${id}`)
      .pipe(
        catchError((error) => {
          console.error('Error al obtener la categoria por id', error);
          throw error;
        }
      )
    );
  }

  getCoursesByCategoryId(id: string): Observable<CourseId[]> {
    return this.http.get<CourseId[]>(`${environment.apiURL}/courses/${id}/categories`)
      .pipe(
        catchError((error) => {
          console.error('Error al obtener los cursos por categoria', error);
          throw error;
        }
      )
    );
  }
}
