import { Component, Input } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-attachment-viewer',
  templateUrl: './attachment-viewer.component.html',
  styleUrl: './attachment-viewer.component.css'
})
export class AttachmentViewerComponent {
  
  apiUrl = `${environment.serverHostAddress}/api/`;
  @Input() file: string = '';

  get fullPath(): string {
    return this.apiUrl + '/' + this.file;
  }

  isImage(file: string): boolean {
    return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(file);
  }

  isAudio(file: string): boolean {
    return /\.(mp3|wav|ogg)$/i.test(file);
  }

  isVideo(file: string): boolean {
    return /\.(mp4|webm|ogg)$/i.test(file);
  }

  isPDF(file: string): boolean {
    return /\.pdf$/i.test(file);
  }

  isDoc(file: string): boolean {
    return /\.(doc|docx)$/i.test(file);
  }

  isExcel(file: string): boolean {
    return /\.(xls|xlsx)$/i.test(file);
  }

  isPPT(file: string): boolean {
    return /\.(ppt|pptx)$/i.test(file);
  }

  isTextOrJson(file: string): boolean {
    return /\.(txt|csv|json)$/i.test(file);
  }

  isOther(file: string): boolean {
    return !(
      this.isImage(file) || this.isAudio(file) || this.isVideo(file) ||
      this.isPDF(file) || this.isDoc(file) || this.isExcel(file) ||
      this.isPPT(file) || this.isTextOrJson(file)
    );
  }
}