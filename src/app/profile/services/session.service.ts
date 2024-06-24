import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment/environment';
import { Observable, map } from 'rxjs';
import { MentorResponse, MentorshipResponse, SessionResponse } from '../interaces/sessions.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }

  getSessionsByStudentLogin(): Observable<SessionResponse[]> {
    const keys = Object.keys(localStorage);
    console.log('LocalStorage Keys:', keys);
    // Obtener el estudiante del localStorage
    const studentString = localStorage.getItem("student");
    const student = JSON.parse(studentString!);
    console.log('Estudiante 2', student);
    // Acceder al _id del estudiante
    console.log('ID del estudiante:', student._id);
    
    return this.http
      .get<SessionResponse[]>(`${environment.apiURL}/sessions/${student._id}/students`)
      .pipe(
        map(response => response)
      );
  }

  getAllMentorships(): Observable<MentorshipResponse[]> {
    return this.http
      .get<MentorshipResponse[]>(`${environment.apiURL}/mentorships`)
      .pipe(
        map(response => response)
      );
  }
  
  getAllMentors(): Observable<MentorResponse[]> {
    return this.http
      .get<MentorResponse[]>(`${environment.apiURL}/mentors`)
      .pipe(
        map(response => response)
      );
  }

  getMentorshipById(mentorship_id: string): Observable<MentorshipResponse> {
    return this.http
      .get<MentorshipResponse>(`${environment.apiURL}/mentorships/${mentorship_id}`)
      .pipe(
        map(response => response)
      );
  }

  getMentorById(mentor_id: string): Observable<MentorResponse> {
    return this.http
      .get<MentorResponse>(`${environment.apiURL}/mentors/${mentor_id}`)
      .pipe(
        map(response => response)
      );
  }
}