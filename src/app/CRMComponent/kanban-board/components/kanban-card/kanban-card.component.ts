import { UtilsService } from '@/app/core/service/utils.service'
import { CommonModule } from '@angular/common'
import { ChangeDetectorRef, Component, inject, Input, TemplateRef } from '@angular/core'
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
import { CrmCommentaireTacheLib } from '@/app/CRMinterface/crm-commentaire-tache-lib'
import { User } from '@/app/CRMinterface/user'


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

  constructor(
    private cdRef: ChangeDetectorRef
  ) {}

  public tacheSprintService = inject(TacheSprintService)

  nameSousTask= "";
  id_tache_parent= "";
  id_employe_assigne= "";
  contenu= "";
  id_expediteur="";
  userObject!:User;


  ssTaskList: CrmTacheLib[] = [];
  thistask!: CrmTacheLib

  listeCommentsTask: CrmCommentaireTacheLib[] = [];


  data = [
    { id: 'FWU1', nom: 'Rakotovelo Marcel' },
    { id: 'FWU2', nom: 'Rabeharisoa Clara' },
    { id: 'FWU3', nom: 'Randrianarisoa Jean' },
    { id: 'FWU4', nom: 'Andriamalala Sophie' },
    { id: 'FWU5', nom: 'Rakotoniaina Thierry' },
    { id: 'FWU6', nom: 'Rasoanaivo Marie' },
    { id: 'FWU7', nom: 'Andriambelo Eric' },
    { id: 'FWU8', nom: 'Ravelojaona Julie' },
    { id: 'FWU9', nom: 'Rasamoelina Patrick ' },
    { id: 'FWU10', nom: 'Ratsimandresy Anna' },
    { id: 'FWU11', nom: 'Ramakavelo Christine' },
    { id: 'FWU12', nom: 'Randrianarisoa Jacques' },
    { id: 'FWU13', nom: 'Rabeharisoa Jane' },
    { id: 'FWU14', nom: 'Randrianarisoa Claude' },
    { id: 'FWU15', nom: 'Andriamalala Marthe' },
    { id: 'FWU16', nom: 'Rakotoniaina Harry' }
  ];



  
  ngOnInit() {
  }



  // loadData() {
  //   const idTache = this.route.snapshot.params['id']; 

  //   this.tacheSprintService.getCommentaireTache(idTache,this.destinataire_id,this.userObject.id,"client").subscribe(result => {
  //     this.listeCommentsTask= result.data;
  //   });

    
  //   this.tacheSprintService.getTacheByIdTache(idTache).subscribe(result => {
  //     console.log("result.data",result.data)
  //     this.detailTache = result.data[0];
  //     this.idTache= result.data[0].id;
  //     this.destinataire_id= result.data[0].id_employe_assigne;
  //     console.log("this.detailTache",this.detailTache)
  //     console.log("this.idTache",this.idTache);
  //     console.log("this.destinataire_id",this.destinataire_id);

  //   });
    
  // }












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
      this.id_employe_assigne=result.data[0].id_employe_assigne;


      const userString = localStorage.getItem('user');
      const user = userString ? JSON.parse(userString) : null;
      this.userObject=user
      this.id_expediteur= user.id;
      this.tacheSprintService.getCommentaireTache(idTask,this.id_employe_assigne,user.id,"membre").subscribe(result => {
        this.listeCommentsTask= result.data;
      });


    });  
    this.refreshTask();
    this.modalService.open(content, options)
    // const userString = localStorage.getItem('user');
    // const user = userString ? JSON.parse(userString) : null;
    // this.userObject=user
    // this.id_expediteur= user.id;
    // this.tacheSprintService.getCommentaireTache(idTask,this.id_employe_assigne,user.id,"membre").subscribe(result => {
    //   this.listeCommentsTask= result.data;
    // });
  }

  onSubmit(){
    console.log("onsubmit")
    //const hoho= this.userObject.id
    const object = {
      expediteur_id: this.id_expediteur,
      destinataire_id : this.id_employe_assigne,
      idTache : this.id_tache_parent,
      contenu : this.contenu
    }

    this.tacheSprintService
      .saveCommentsTask(object)
      .subscribe((result) => {
        console.log("après save message");
        console.log(result.message);
        this.contenu= "";
        this.refreshData()
      });
  }

  refreshData() {
    // Ici, tu mets à jour les données de ton composant
    // Par exemple :
    this.loadData();
    
    // Ensuite, forcer Angular à détecter les changements
    this.cdRef.detectChanges();
  }

  loadData()
  {
    //console.log("idTache",idTask)
    //this.id_tache_parent=idTask; 
    this.tacheSprintService.getssTachesByIdTache(this.id_tache_parent)
    .subscribe(result => {
      console.log("hi log resultat");
      console.log(result);
      console.log(result.data);
      console.log("fin log resultat");
      this.ssTaskList = result.data;
      this.id_employe_assigne=result.data[0].id_employe_assigne;


      const userString = localStorage.getItem('user');
      const user = userString ? JSON.parse(userString) : null;
      this.userObject=user
      this.tacheSprintService.getCommentaireTache(this.id_tache_parent,this.id_employe_assigne,user.id,"membre").subscribe(result => {
        this.listeCommentsTask= result.data;
      });
    });  
    this.refreshTask();
    // const userString = localStorage.getItem('user');
    // const user = userString ? JSON.parse(userString) : null;
    // this.userObject=user
    // this.tacheSprintService.getCommentaireTache(this.id_tache_parent,this.id_employe_assigne,user.id,"membre").subscribe(result => {
    //   this.listeCommentsTask= result.data;
    // });
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
