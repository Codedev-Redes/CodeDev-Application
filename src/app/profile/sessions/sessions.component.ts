import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { InfoShow, MentorResponse, MentorshipResponse, SessionResponse } from '../interaces/sessions.interface';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.css'
})
export class SessionsComponent implements OnInit {

  sessions!: SessionResponse[]
  mentorships!: MentorshipResponse[]
  mentors!: MentorResponse[]
  data: InfoShow[] = [];
  constructor(
    private sessionService: SessionService,
    private router: Router
  ) { }

  ngOnInit() {
    // Use forkJoin to wait for all observables to complete
    forkJoin({
      sessions: this.sessionService.getSessionsByStudentLogin(),
      mentorships: this.sessionService.getAllMentorships(),
      mentors: this.sessionService.getAllMentors()
    }).subscribe({
      next: ({ sessions, mentorships, mentors }) => {
        this.sessions = sessions;
        this.mentorships = mentorships;
        this.mentors = mentors;

        //console.log('Sesiones', sessions);
        //console.log('Mentorias', mentorships);
        //console.log('Mentors', mentors);

        // Process the sessions
        this.sessions.forEach(session => {
          const mentorship = this.mentorships.find(mentorship => mentorship._id === session.mentorship_id);
          //console.log('Mentoria', mentorship);
          if (mentorship) {
            const mentor = this.mentors.find(mentor => mentor._id === mentorship.mentors_id);
            //console.log('Mentor', mentor);
            if (mentor) {
              const infoShowInstance: InfoShow = {
                _id: session._id,
                nameMentor: mentor.name,
                lastNameMentor: mentor.last_name,
                email: mentor.email,
                speciality: mentor.speciality,
                modality: mentor.modality,
                price: mentor.price,
                topic: mentorship.topic,
                type: mentorship.type,
                start_date: mentorship.start_date,
                end_date: mentorship.end_date,
                url: session.url,
              };
              this.data.push(infoShowInstance);
            } else {
              console.error(`No se encontró mentor con ID ${mentorship.mentors_id}`);
            }
          } else {
            console.error(`No se encontró mentoria con ID ${session.mentorship_id}`);
          }
          console.log('InfoShow', this.data);
        });
      },
      error: (error) => {
        console.error('Error al obtener los datos', error);
      }
    });

  }

  parseDateTime(dateTimeString: string) {
    const date = new Date(dateTimeString);

    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Months are zero-indexed in JavaScript
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    // Formatear con ceros a la izquierda si es necesario
    const dayStr = day < 10 ? '0' + day : day;
    const monthStr = month < 10 ? '0' + month : month;
    const hoursStr = hours < 10 ? '0' + hours : hours;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;

    // Formato deseado: "DD-MM-YYYY HH:MM"
    const formattedDateTime = `${dayStr}-${monthStr}-${year} ${hoursStr}:${minutesStr}`;
    console.log('Fecha formateada:', formattedDateTime);
    return formattedDateTime;
}

  handleSessions2() {
    console.log(this.data);
  }

  navigateToUrl(url: string) {
    window.location.href = url;
  }
}
