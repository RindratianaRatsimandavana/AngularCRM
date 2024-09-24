import { Component, inject, TemplateRef } from '@angular/core'
import { AudioList, DocumentList, FolderList, ImageList } from './data'
import {
  NgbDropdownModule,
  NgbModal,
  NgbNavModule,
  NgbProgressbarModule,
} from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'app-files',
  standalone: true,
  imports: [
    NgbProgressbarModule,
    CommonModule,
    NgbNavModule,
    NgbDropdownModule,
  ],
  templateUrl: './files.component.html',
  styles: ``,
})
export class FilesComponent {
  folders = FolderList
  documents = DocumentList
  images = ImageList
  audioData = AudioList

  selectedFile: any = null;

  private modalService = inject(NgbModal)
  variant!: string

  constructor(public sanitizer: DomSanitizer) {}

  openFilePreview(file: any) {
    this.selectedFile = file;
  }

  closePreview() {
    this.selectedFile = null;
  }

  openVarientModal(content: TemplateRef<any>, variant: string,file: any) {
    this.selectedFile = file;
    this.variant = variant
    this.modalService.open(content, { fullscreen: variant })
  }
}
