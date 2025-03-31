import { UtilsService } from '@/app/core/service/utils.service';
import { CrmTacheLib } from '@/app/CRMinterface/crm-tache-lib';
import { GeneralService } from '@/app/CRMservice/general.service';
import { TacheSprintService } from '@/app/CRMservice/tache-sprint.service';
import { ChangeDetectorRef, Component, inject, Input, NgZone, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardTitleComponent } from '@/app/components/card-title.component'
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CrmFeedbackCommentaire } from '@/app/CRMinterface/crm-feedback-commentaire';
import { FormsModule } from '@angular/forms'; 


@Component({
  selector: 'app-project-cl-detail',
  standalone: true,
  imports: [CardTitleComponent,CommonModule,RouterLink,FormsModule],
  templateUrl: './project-cl-detail.component.html',
  styleUrl: './project-cl-detail.component.scss'
})
export class ProjectClDetailComponent {

  @Input() title: string = 'Liste des tâches de ce projet';

  private modalService = inject(NgbModal)


  //private modalService = inject(NgbModal)
  tacheTemp: CrmTacheLib[] = [];
  idProjet?:string;
  
//  tachesParSprint: any = {};
  tachesParSprint: { [sprintId: string]: CrmTacheLib[] } = {};

  //listeSprint: CrmSprint[] = [];


  //resaka scoring
  //valueScore=1;
  commentValue="";
  valueScore: number = 0; // score sélectionné (étoile)
  preciseScore: number | null = null; // score précis
  minScore: number = 0; // valeur minimale pour l'input de score précis
  maxScore: number = 0; // valeur maximale pour l'input de score précis
  idTaskToRate= '';
  idEmplAssigne= '';
  modalRef: NgbModalRef | undefined;
  feedBackCommentaire: CrmFeedbackCommentaire = {};
  idScoreToUpdate= '';

  

  constructor(private tacheSprintService: TacheSprintService,private route:ActivatedRoute,
    public service :UtilsService,public generalService :GeneralService, private cdRef: ChangeDetectorRef, private zone: NgZone) {
      // Initialise le formulaire principal
    // this.backlogForm = this.fb.group({
    //   tasks: this.fb.array([]) // FormArray qui contiendra les formulaires pour chaque ligne de tâche
    // });
}

  ngOnInit() {
    this.loadData()
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


  // submitFeedBackAndScoreClient() {
  //   if (this.preciseScore !== null) {
  //     console.log(`Commentaire: ${this.commentValue}`);
  //     console.log(`Score étoile: ${this.valueScore}, Score précis: ${this.preciseScore}`);
  //     console.log("idTache ",this.idTaskToRate);

  //     const userString = localStorage.getItem('user');
  //     const userObject = userString ? JSON.parse(userString) : null;

  //     //id_tache/commentaireChefProjet/id_employe_assigne
    
  //       this.tacheSprintService.getScoreByIdTache(this.idTaskToRate).subscribe(result => {
  //             this.feedBackCommentaire = result.data[0];
  //             this.idScoreToUpdate= result.data[0].id;
  //             console.log('this.feedBackCommentaire')
  //             console.log(this.feedBackCommentaire)

  //             console.log("this.idScoreToUpdate",this.idScoreToUpdate)
  //             const object = { 
  //               id: this.idScoreToUpdate,
  //               commentaireClient: this.commentValue,
  //               scoreClient: this.preciseScore,
  //               id_client: userObject.id
  //               };
      
  //             this.tacheSprintService
  //               .updateScore(object)
  //               .subscribe((result) => {
  //                 //console.log(result.message);
  //                 console.log("score updaté")
  //                 this.tacheSprintService
  //                 .updateTaskEtat(this.idTaskToRate,3)
  //                 .subscribe((result) => {
  //                   //console.log(result.message);
  //                   console.log("etat modifié")
  //                   this.closeModal();
  //                 });


  //                 this.closeModal();
  //               });
            
  //       });

        


      
  //   } else {
  //     alert('Veuillez entrer un score précis.');
  //   }
  // }

  submitFeedBackAndScoreClient() {
    if (this.preciseScore !== null) {
      console.log(`Commentaire: ${this.commentValue}`);
      console.log(`Score étoile: ${this.valueScore}, Score précis: ${this.preciseScore}`);
      console.log("idTache ", this.idTaskToRate);
  
      const userString = localStorage.getItem('user');
      const userObject = userString ? JSON.parse(userString) : null;
  
      // Récupérer l'id du score à mettre à jour
      this.tacheSprintService.getScoreByIdTache(this.idTaskToRate).subscribe(result => {
        this.feedBackCommentaire = result.data[0];
        this.idScoreToUpdate = result.data[0].id;
        console.log('this.feedBackCommentaire', this.feedBackCommentaire);
        console.log("this.idScoreToUpdate", this.idScoreToUpdate);
  
        // Créer l'objet seulement si preciseScore est un nombre
        if (this.preciseScore !== null) {
          const object = { 
            id: this.idScoreToUpdate,
            commentaireClient: this.commentValue,
            scoreClient: this.preciseScore, // preciseScore ne peut pas être null ici
            id_client: userObject.id
          };
  
          // Mettre à jour le score
          this.tacheSprintService.updateScore(object).subscribe((result) => {
            console.log("score updaté");
            this.tacheSprintService.updateTaskEtat(this.idTaskToRate, 3).subscribe((result) => {
              console.log("etat modifié");
              this.closeModal();
            });
  
            this.closeModal();
          });
        }
      });
    } else {
      alert('Veuillez entrer un score précis.');
    }
  }
  

  onStarChange(starValue: number) {
    this.valueScore = starValue;

    // Définir les intervalles basés sur l'étoile choisie
    switch (starValue) {
      case 1:
        this.minScore = 0;
        this.maxScore = 20;
        break;
      case 2:
        this.minScore = 21;
        this.maxScore = 40;
        break;
      case 3:
        this.minScore = 41;
        this.maxScore = 60;
        break;
      case 4:
        this.minScore = 61;
        this.maxScore = 80;
        break;
      case 5:
        this.minScore = 81;
        this.maxScore = 100;
        break;
      default:
        this.minScore = 0;
        this.maxScore = 100;
        break;
    }
  }

  openModal(content: TemplateRef<HTMLElement>, options: NgbModalOptions,paramidTaskToRate: string = '',
    paramidEmployeAssigne: string = ''
  ) {
    this.modalRef =this.modalService.open(content, options);
    //if(!paramidTaskToRate){
      this.idTaskToRate= paramidTaskToRate

      console.log("modal this.idTaskToRate",this.idTaskToRate)
    //} 
    //if(!paramidEmployeAssigne){
      this.idEmplAssigne= paramidEmployeAssigne
      console.log("modal this.idEmplAssigne ",this.idEmplAssigne)
    //}
    
    

  }

  closeModal() {
    if (this.modalRef) {
      this.modalRef.dismiss();  // ou .close() si vous voulez déclencher le résultat de fermeture
    }
    this.refreshData();
  }

  refreshData() {
    // Ici, tu mets à jour les données de ton composant
    // Par exemple :
    this.loadData();
    
    // Ensuite, forcer Angular à détecter les changements
    this.cdRef.detectChanges();
  }

  loadData(){
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


}
