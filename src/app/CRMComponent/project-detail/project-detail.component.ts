import { Component, inject, TemplateRef } from '@angular/core';
import { UtilsService } from '@/app/core/service/utils.service'
import { TacheSprintService } from '@/app/CRMservice/tache-sprint.service';
import { ActivatedRoute } from '@angular/router';
import { CrmTacheLib } from '@/app/CRMinterface/crm-tache-lib';
import { CommonModule } from '@angular/common';
import {NgbAccordionModule,NgbProgressbarModule} from '@ng-bootstrap/ng-bootstrap'

import { RouterLink } from '@angular/router';
import { CrmTache } from '@/app/CRMinterface/crm-tache';
import { CrmSprint } from '@/app/CRMinterface/crm-sprint';
import { GeneralService } from '@/app/CRMservice/general.service';
import { User } from '@/app/CRMinterface/user';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CardTitleComponent } from '@/app/components/card-title.component'
import { ReactiveFormsModule } from '@angular/forms';

import {
  NgbModal,
  NgbModalConfig,
  type NgbModalOptions,
} from '@ng-bootstrap/ng-bootstrap'


@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [NgbAccordionModule,NgbProgressbarModule,CommonModule,NgbAccordionModule,
    NgbProgressbarModule,RouterLink,CardTitleComponent,ReactiveFormsModule],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent {
  private modalService = inject(NgbModal)
  tacheTemp: CrmTacheLib[] = [];
  idProjet?:string;
  permission?:string;
  tacheBacklog: CrmTache[] = [];
//  tachesParSprint: any = {};
tachesParSprint: { [sprintId: string]: CrmTacheLib[] } = {};

listeSprint: CrmSprint[] = [];
listeEmployeInfo: User[] = [];
  //modalService: any;

 // idProject=this.route.snapshot.params['id'];

//backlogForm: FormGroup; // Formulaire réactif


  constructor(private fb: FormBuilder,private tacheSprintService: TacheSprintService,private route:ActivatedRoute,
    public service :UtilsService,public generalService :GeneralService) {
      // Initialise le formulaire principal
    // this.backlogForm = this.fb.group({
    //   tasks: this.fb.array([]) // FormArray qui contiendra les formulaires pour chaque ligne de tâche
    // });
}

  ngOnInit() {
    const id = this.route.snapshot.params['id']; 
    const permission = this.route.snapshot.params['permission'];
    console.log("id:"+id);
    console.log("permission:"+permission);

    this.idProjet=id; 
    this.permission=permission;

    const userString = localStorage.getItem('user');
    const userObject = userString ? JSON.parse(userString) : null;
    this.tacheSprintService.getTaches(id,userObject.id,permission).subscribe(result => {
      this.tacheTemp = result.data;
      // this.idProjet=result.data.id_projet
      // this.permission=result.data.permission
      // console.log(result.data)
      // console.log("resultaaaaaaaaaaaaaaat",this.tacheTemp);
      this.tachesParSprint = this.groupBySprint(result.data);
      console.log(this.tachesParSprint)
      // console.log("verificationnnnnnnnnnnnnnnnnn",this.groupBySprint(result.data))

      //this.initTaskForms(); // Initialiser les formulaires de chaque tâche

    });

    
    this.tacheSprintService.getTacheBacklogByProject(this.idProjet).subscribe(result => {
      this.tacheBacklog = result.data;
      console.log("this.tacheBacklog",this.tacheBacklog)
    });


    this.tacheSprintService.getSprintByProject(this.idProjet).subscribe(result => {
      this.listeSprint = result.data;
      console.log("this.listeSprint",this.listeSprint)
    });

    this.generalService.getAllMembreProject(this.idProjet).subscribe(result => {
      this.listeEmployeInfo = result.data;
      console.log("this.listeEmployeInfo",this.listeEmployeInfo)
    });
    

    // this.tacheSprintService.getAllUserProject(userObject.id)
    // .subscribe(result => {
    //   console.log("hi log resultat");
    //   console.log(result);
    //   console.log(result.data);
    //   console.log("fin log resultat");
    //   this.projectList = result.data;
    // }); 
  }

  // Fonction pour regrouper les tâches par sprint
  // groupBySprint(taches: any[]): any {
  //   return taches.reduce((grouped, tache) => {
  //     const sprintId = tache.id_sprint || 'Sans Sprint'; // Groupe par sprint ou "sans sprint"
  //     if (!grouped[sprintId]) {
  //       grouped[sprintId] = [];
  //     }
  //     grouped[sprintId].push(tache);
  //     return grouped;
  //   }, {});
  // }

  // Fonction pour regrouper les tâches par sprint
  groupBySprint(taches: CrmTacheLib[]): { [sprintId: string]: CrmTacheLib[] } {
    return taches.reduce((grouped: { [sprintId: string]: CrmTacheLib[] }, tache) => {
      const sprintId = tache.sprint_nom || 'Sans Sprint'; // Groupe par sprint ou "sans sprint"
      if (!grouped[sprintId]) {
        grouped[sprintId] = [];
      }
      grouped[sprintId].push(tache);
      console.log("grouped");
      console.log(grouped);
      return grouped;
    }, {});
  }

  trackById(index: number, task: any): number {
    return task.id; // Assurez-vous que chaque tâche a un ID unique
  }

  openModal(content: TemplateRef<HTMLElement>, options: NgbModalOptions) {
    this.modalService.open(content, options)
  }


  // Méthode pour créer un FormArray dynamique basé sur les tâches du backlog
  // initTaskForms() {
  //   //const taskFormArray = this.backlogForm.get('tasks') as FormArray;
  //   this.tacheBacklog.forEach(task => {
  //     taskFormArray.push(this.fb.group({
  //       id: [task.id],
  //       nom: [task.nom],
  //       desc_tache: [task.descTache],
  //       priorite: ['', Validators.required], // Champ pour la priorité
  //       id_sprint: ['', Validators.required], // Champ pour la priorité
  //       id_employe_assigne: ['', Validators.required] // Champ pour l'employé assigné
  //     }));
  //   });
  // }
  
  // Accès rapide au FormArray
  // get taskForms() {
  //   return this.backlogForm.get('tasks') as FormArray;
  // }

  // Méthode pour attribuer une tâche
  //assignTask(index: number) {
    //const taskForm = this.taskForms.at(index); // Récupérer le formulaire de la ligne spécifique

    // Préparer l'objet à envoyer au backend
  //   const taskUpdate = { 
  //     id: taskForm.value.id,
  //     priorite: taskForm.value.priorite,
  //     id_employe_assigne: taskForm.value.idEmploye,
  //     id_sprint: taskForm.value.idSprint
  //   };

  //   // Appeler le service pour attribuer la tâche
  //   this.tacheSprintService.updateattributeTask(taskUpdate).subscribe(response => {
  //     console.log('Tâche attribuée avec succès', response);
  //     // Effectuer d'autres actions après la mise à jour, par exemple actualiser la liste
  //   }, error => {
  //     console.error('Erreur lors de l\'attribution de la tâche', error);
  //   });
  // }

}
