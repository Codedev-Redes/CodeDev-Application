import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordsRoutingModule } from './records-routing.module';
import { RecordsComponent } from './records.component';
import { InfoRecordsComponent } from './info-records/info-records.component';


@NgModule({
  declarations: [
    RecordsComponent,
    InfoRecordsComponent
  ],
  imports: [
    CommonModule,
    RecordsRoutingModule
  ]
})
export class RecordsModule { }
