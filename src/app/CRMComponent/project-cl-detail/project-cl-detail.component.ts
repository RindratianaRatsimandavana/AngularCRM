import { UtilsService } from '@/app/core/service/utils.service';
import { CrmTacheLib } from '@/app/CRMinterface/crm-tache-lib';
import { GeneralService } from '@/app/CRMservice/general.service';
import { TacheSprintService } from '@/app/CRMservice/tache-sprint.service';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardTitleComponent } from '@/app/components/card-title.component'
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-cl-detail',
  standalone: true,
  imports: [CardTitleComponent,CommonModule,RouterLink],
  templateUrl: './project-cl-detail.component.html',
  styleUrl: './project-cl-detail.component.scss'
})
export class ProjectClDetailComponent {

  @Input() title: string = 'Liste des tâches de ce projet';

  //private modalService = inject(NgbModal)
  tacheTemp: CrmTacheLib[] = [];
  idProjet?:string;
  
//  tachesParSprint: any = {};
  tachesParSprint: { [sprintId: string]: CrmTacheLib[] } = {};

  //listeSprint: CrmSprint[] = [];

  constructor(private tacheSprintService: TacheSprintService,private route:ActivatedRoute,
    public service :UtilsService,public generalService :GeneralService) {
      // Initialise le formulaire principal
    // this.backlogForm = this.fb.group({
    //   tasks: this.fb.array([]) // FormArray qui contiendra les formulaires pour chaque ligne de tâche
    // });
}

  ngOnInit() {
    const id = this.route.snapshot.params['id']; 
    console.log("id projet:"+id);

    this.idProjet=id; 

    const userString = localStorage.getItem('user');
    const userObject = userString ? JSON.parse(userString) : null;
    this.tacheSprintService.getTachesCleint(id).subscribe(result => {
      this.tacheTemp = result.data;
      this.tachesParSprint = this.groupBySprint(result.data);
      console.log('this.tachesParSprint')
      console.log(this.tachesParSprint)

    });

    
    // this.tacheSprintService.getTacheBacklogByProject(this.idProjet).subscribe(result => {
    //   this.tacheBacklog = result.data;
    //   console.log("this.tacheBacklog",this.tacheBacklog)
    // });


    // this.tacheSprintService.getSprintByProject(this.idProjet).subscribe(result => {
    //   this.listeSprint = result.data;
    //   console.log("this.listeSprint",this.listeSprint)
    // });

    // this.generalService.getAllMembreProject(this.idProjet).subscribe(result => {
    //   this.listeEmployeInfo = result.data;
    //   console.log("this.listeEmployeInfo",this.listeEmployeInfo)
    // });
    
  }


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

  // openModal(content: TemplateRef<HTMLElement>, options: NgbModalOptions) {
  //   this.modalService.open(content, options)
  // }

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
