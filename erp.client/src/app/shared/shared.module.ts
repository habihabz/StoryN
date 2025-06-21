import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachmentViewerComponent } from '../pages/attachment-viewer/attachment-viewer.component';




@NgModule({
  declarations: [AttachmentViewerComponent],
  imports: [
    CommonModule
  ],
  exports: [AttachmentViewerComponent] 
})
export class SharedModule { }
