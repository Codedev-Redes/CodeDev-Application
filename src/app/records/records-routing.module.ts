import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordsComponent } from './records.component';
import { InfoRecordsComponent } from './info-records/info-records.component';

const routes: Routes = [
  {path: '', component: InfoRecordsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecordsRoutingModule { }
