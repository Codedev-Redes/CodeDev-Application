import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { InfoShow, MentorResponse, MentorshipResponse, SessionResponse } from '../interaces/sessions.interface';
import { forkJoin } from 'rxjs';

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
    private sessionService: SessionService
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
              console.log('InfoShow', infoShowInstance);
              this.data.push(infoShowInstance);
            } else {
              console.error(`No se encontró mentor con ID ${mentorship.mentors_id}`);
            }
          } else {
            console.error(`No se encontró mentoria con ID ${session.mentorship_id}`);
          }
        });
      },
      error: (error) => {
        console.error('Error al obtener los datos', error);
      }
    });

  }


  handleSessions() {
   
  }

  handleSessions2() {
    console.log(this.data);
  }

  handleSessions3() {
    //this.sessionService.getMentorById("6678a927b2a2eb17ba6c2c2f").subscribe({
    //  next: (mentor) => {
    //    this.mentor = mentor;
    //    console.log('Mentor', mentor);
    //  },
    //  error: (error) => {
    //    console.error('Error al obtener el mentor', error);
    //  }
    //});
  }
}
