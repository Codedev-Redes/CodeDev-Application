import { Mentors } from './../interfaces/auth.interface';
import { Observable, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class MentorService {

  constructor(
    private http : HttpClient
  ) { }

  getMentors(): Observable<Mentors[]>{
    return this.http.get<Mentors[]>(`${environment.apiURL}/mentors`)
      .pipe(
        catchError((error) => {
          console.error('Error al obtener el estudiante por email', error);
          throw error;
        }
      )
    );
  }
}
