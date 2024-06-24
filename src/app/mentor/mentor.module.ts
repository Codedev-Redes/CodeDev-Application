import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MentorRoutingModule } from './mentor-routing.module';
import { MentorComponent } from './mentor.component';
import { MentoresComponent } from './mentores/mentores.component';


@NgModule({
  declarations: [
    MentorComponent,
    MentoresComponent
  ],
  imports: [
    CommonModule,
    MentorRoutingModule
  ]
})
export class MentorModule { }
