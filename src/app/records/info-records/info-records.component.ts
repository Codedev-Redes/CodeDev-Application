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
    const knownSizeInBytes = 1921174;
    const knownDurationInSeconds = 33;
    const bitrateKbps = (knownSizeInBytes * 8 / knownDurationInSeconds) / 1000; // en kbps
    console.log('Bitrate estimado:', bitrateKbps); // 465.13 kbps (aproximadamente)

    this.recordService.getMetadata().subscribe({
      next: videos => {
        for (const video of videos) {
          const sizeInBytes = parseInt(video.length);
          const sizeInMB = sizeInBytes / (1024 * 1024); // convertir bytes a MB
          const durationInSeconds = (sizeInBytes * 8) / (bitrateKbps * 1000); // estimar duración en segundos

          video.size = parseFloat(sizeInMB.toFixed(1));
          video.duration = parseFloat(durationInSeconds.toFixed(1));
        }

        this.videos = videos;
        console.log('Videos:', videos);
      },
      error: error => {
        console.error('Error downloading videos:', error);
      }
    });
  }

  /*handleVideo(id_video: string): void {
  //  console.log('Video clicked');
//
  //  this.recordService.getVideoByIdFile(id_video).subscribe(
  //    blob => {
  //      this.videoBlobUrl = window.URL.createObjectURL(blob);
  //      this.videoUrl = this.videoBlobUrl;
  //    },
  //    error => {
  //      console.error('Error downloading video:', error);
  //    }
  //  );}
  */

  // Handle a video in new tab
  handleVideo(id_video: string): void {
    console.log('Video clicked');

    this.recordService.getVideoByIdFile(id_video).subscribe(
      blob => {
        const videoBlobUrl = window.URL.createObjectURL(blob);
        const newWindow = window.open("", "_blank");
      
        if (newWindow) {
          newWindow.document.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Video Player</title>
              <style>
                body, html {
                  margin: 0;
                  padding: 0;
                  width: 100%;
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  background-color: black;
                }
                video {
                  width: 100%;
                  height: 100%;
                }
              </style>
            </head>
            <body>
              <video src="${videoBlobUrl}" controls></video>
            </body>
            </html>
          `);
          newWindow.document.close();
        } else {
          console.error('Error opening new window');
        }
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
