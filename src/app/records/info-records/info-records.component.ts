import { Component, OnInit } from '@angular/core';
import { RecordService } from '../services/record.service';
import { VideoResponse } from '../interfaces/record.interface';

@Component({
  selector: 'app-info-records',
  templateUrl: './info-records.component.html',
  styleUrl: './info-records.component.css'
})
export class InfoRecordsComponent implements OnInit{
  videoUrl: string | null = null
  videoBlobUrl: string | null = null
  videos!: VideoResponse[]

  constructor(
    private recordService: RecordService
  ) { }

  ngOnInit(): void {
    this.recordService.getMetadata().subscribe({
      next: videos => {
        this.videos = videos;
        console.log('Videos:', videos);
      },
      error: error => {
        console.error('Error downloading videos:', error);
      }
    })
  }

  handleVideo(id_video: string): void {
    console.log('Video clicked');

    this.recordService.getVideoByIdFile(id_video).subscribe(
      blob => {
        this.videoBlobUrl = window.URL.createObjectURL(blob);
        this.videoUrl = this.videoBlobUrl;
      },
      error => {
        console.error('Error downloading video:', error);
      }
    );
  }
  // Dentro de tu componente
  trackById(index: number, video: any): string {
    return video._id; // Asumiendo que _id es una cadena
  }

}
