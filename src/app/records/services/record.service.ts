import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { VideoResponse } from '../interfaces/record.interface';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private http: HttpClient) {}

  getMetadata(): Observable<VideoResponse[]>{
    return this.http.get<VideoResponse[]>(`${environment.apiURL}/getMetadata`);
  }
  getVideoByIdFile(fileId: string): Observable<Blob> {
    return this.http.get(`${environment.apiURL}/getFile/${fileId}`, { responseType: 'blob' });
  }
}
