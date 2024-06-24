import { Component } from '@angular/core';
import { Mentors } from '../interfaces/auth.interface';
import { MentorService } from '../services/mentor.service';

@Component({
  selector: 'app-mentores',
  templateUrl: './mentores.component.html',
  styleUrl: './mentores.component.css'
})
export class MentoresComponent {

  mentors: Mentors[] = [];

  constructor(
    private mentorService: MentorService
  ) {}

  ngOnInit(): void {
    this.mentorService.getMentors()
      .subscribe((mentors) => {
        this.mentors = mentors;
      });
  }
}
