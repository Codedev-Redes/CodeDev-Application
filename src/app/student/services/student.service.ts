import { Student } from './../interfaces/auth.interface';
import { Observable, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getStudentByEmail(email: string): Observable<Student>{
    return this.http.get<Student>(`${environment.apiURL}/students/${email}/email`)
      .pipe(
        catchError((error) => {
          console.error('Error al obtener el estudiante por email', error);
          throw error;
        }
      )
    );
  }
}
