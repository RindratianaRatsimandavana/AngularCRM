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
import { TacheSprintService } from '@/app/CRMservice/tache-sprint.service'
import { CrmTache } from '@/app/CRMinterface/crm-tache'
import { CrmTacheLib } from '@/app/CRMinterface/crm-tache-lib'


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

  public tacheSprintService = inject(TacheSprintService)

  nameSousTask= "";
  id_tache_parent= "";

  ssTaskList: CrmTacheLib[] = [];
  thistask!: CrmTacheLib
  
  ngOnInit() {
  }

  calculateProgress(compleTask: number, totalTask: number) {
    this.progress = (compleTask / totalTask) * 100
    return Math.round(this.progress)
  }
  
  openModal(content: TemplateRef<HTMLElement>, options: NgbModalOptions,idTask:string) {
    console.log("idTache",idTask)
    this.id_tache_parent=idTask;
    this.tacheSprintService.getssTachesByIdTache(idTask)
    .subscribe(result => {
      console.log("hi log resultat");
      console.log(result);
      console.log(result.data);
      console.log("fin log resultat");
      this.ssTaskList = result.data;
    });  
    this.refreshTask();
    this.modalService.open(content, options)
  }


  addSousTask(){
      this.submitssTask();
  }

  submitssTask(){
    console.log("ato amin subm task");
    const object = {
      nom: this.nameSousTask,
      statut : 0,
      id_employe_assigne : this.thistask.id_employe_assigne,
      id_projet : this.thistask.id_projet,
      id_sprint : this.thistask.id_sprint,
      id_tache_parent : this.thistask.id
    }
    this.tacheSprintService
      .saveSsTask(object)
      .subscribe((result) => {
        console.log(result.message);
          // Après l'ajout, on rafraîchit la liste
        this.tacheSprintService.getssTachesByIdTache(this.id_tache_parent).subscribe((res) => {          
          this.ssTaskList = res.data;
          console.log("maka checklist",this.ssTaskList)
        });

        // Réinitialiser le champ de sous-tâche
        this.nameSousTask = '';
      });

  }

  toggleSousTaskStatus(tache: any) {
    // Met à jour le statut de la sous-tâche
    const newStatus = tache.statut === 3 ? 0 : 3;
    
    // Appelle le service pour mettre à jour le statut de la sous-tâche
    this.tacheSprintService.updateSousTaskStatus(tache.id, newStatus).subscribe(
      (response) => {
        // Met à jour le statut localement si la requête est réussie
        tache.statut = newStatus;
        
        // Si le trigger est bien configuré dans la base, le progrès de la tâche parent sera automatiquement mis à jour
        console.log('Sous-tâche mise à jour avec succès', response);
        this.refreshTask();
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de la sous-tâche', error);
      }
    );
  }

  refreshTask(){
      //naka tache
    this.tacheSprintService.getTacheByIdTache(this.id_tache_parent)
    .subscribe(result => {
      console.log("hi log resultat");
      console.log(result);
      console.log(result.data);
      console.log("result.data",result.data);
      console.log("fin log resultat");
      this.thistask = result.data[0];
      console.log("this.thistask",this.thistask);
    });  

  }

  getAvatarUserConnectedOtherUser(nom: string | undefined) {
    if (!nom) {
        return ''; // ou toute autre valeur par défaut
    }

    return nom
        .split(' ')
        .map((word: string) => word[0])
        .join('')
        .toUpperCase();
  }

  
  
}
