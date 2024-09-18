import { UtilsService } from '@/app/core/service/utils.service'
import { CommonModule } from '@angular/common'
import { Component, inject, Input, TemplateRef } from '@angular/core'
import {
  NgbDropdownModule,
  NgbProgressbarModule,
} from '@ng-bootstrap/ng-bootstrap'
import type { KanbanTaskType } from '../../data'
import {
  NgbModal,
  NgbModalConfig,
  type NgbModalOptions,
} from '@ng-bootstrap/ng-bootstrap'
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
  type UntypedFormGroup,
} from '@angular/forms'


@Component({
  selector: 'app-kanban-card',
  standalone: true,
  imports: [CommonModule, NgbProgressbarModule, NgbDropdownModule,FormsModule,
    ReactiveFormsModule],
  templateUrl: './kanban-card.component.html',
  styles: ``,
})
export class KanbanCardComponent {
  @Input() task!: KanbanTaskType
  progress: number = 0

  public service = inject(UtilsService)
  private modalService = inject(NgbModal)

  

  calculateProgress(compleTask: number, totalTask: number) {
    this.progress = (compleTask / totalTask) * 100
    return Math.round(this.progress)
  }
  
  openModal(content: TemplateRef<HTMLElement>, options: NgbModalOptions,idTask:string) {
    console.log("idTache",idTask)
    this.modalService.open(content, options)
  }
}
