import { ChangeDetectorRef, Component, inject, Input, TemplateRef, NgZone } from '@angular/core';
import { UtilsService } from '@/app/core/service/utils.service'
import { TacheSprintService } from '@/app/CRMservice/tache-sprint.service';
import { ActivatedRoute } from '@angular/router';
import { CrmTacheLib } from '@/app/CRMinterface/crm-tache-lib';
import { CommonModule } from '@angular/common';
import {NgbAccordionModule,NgbModalRef,NgbProgressbarModule} from '@ng-bootstrap/ng-bootstrap'

import { RouterLink } from '@angular/router';
import { CrmTache } from '@/app/CRMinterface/crm-tache';
import { CrmSprint } from '@/app/CRMinterface/crm-sprint';
import { GeneralService } from '@/app/CRMservice/general.service';
import { User } from '@/app/CRMinterface/user';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CardTitleComponent } from '@/app/components/card-title.component'
import { ReactiveFormsModule } from '@angular/forms';

import { FormsModule } from '@angular/forms'; 

import {
  NgbModal,
  NgbModalConfig,
  type NgbModalOptions,
} from '@ng-bootstrap/ng-bootstrap'
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [NgbAccordionModule,NgbProgressbarModule,CommonModule,NgbAccordionModule,
    NgbProgressbarModule,RouterLink,CardTitleComponent,ReactiveFormsModule,FormsModule],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent {

  isActive: boolean = false; // Initialement inactif

  @Input() title: string = 'Liste des tâches';

  private modalService = inject(NgbModal)
  tacheTemp: CrmTacheLib[] = [];
  idProjet?:string;
  permission?:string;
  tacheBacklog: CrmTache[] = [];
  //  tachesParSprint: any = {};
  tachesParSprint: { [sprintId: string]: CrmTacheLib[] } = {};

  listeSprint: CrmSprint[] = [];
  listeEmployeInfo: User[] = [];

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

  // resaka sprint 
  nomSprint= "";
  startdate = "";
  enddate = "";


selectedTechno: string [] = [];


// TRAITEMENT CDC:
selectedFile: File | undefined ;

extractedText: string = ''; // Variable pour stocker le texte extrait

listTaskCDC: string[] = [];

showTasks: boolean = false; // Variable pour contrôler l'affichage du textarea
isLoading: boolean = false; // Variable pour gérer l'état de chargement


isLoadingPredict: boolean = false;
showPredict: boolean = false;


  //modalService: any;

 // idProject=this.route.snapshot.params['id'];

//backlogForm: FormGroup; // Formulaire réactif


  constructor(private fb: FormBuilder,private tacheSprintService: TacheSprintService,private route:ActivatedRoute,
    public service :UtilsService,public generalService :GeneralService,private http: HttpClient,
    private cdRef: ChangeDetectorRef, private zone: NgZone) {
      // Initialise le formulaire principal
    // this.backlogForm = this.fb.group({
    //   tasks: this.fb.array([]) // FormArray qui contiendra les formulaires pour chaque ligne de tâche
    // });
}


isEmptyObject(obj: any): boolean {
  return Object.keys(obj).length === 0;
}

getKeys(obj: any): string[] {
  return Object.keys(obj);
}


  loadData()
  {
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

  refreshData() {
    // Ici, tu mets à jour les données de ton composant
    // Par exemple :
    this.loadData();
    
    // Ensuite, forcer Angular à détecter les changements
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    this.loadData();
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


  onCheckboxChange(event: any) {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      this.selectedTechno.push(value); // Ajouter l'élément s'il est coché
    } else {
      const index = this.selectedTechno.indexOf(value);
      if (index > -1) {
        this.selectedTechno.splice(index, 1); // Retirer l'élément s'il est décoché
      }
    }
    
    console.log(this.selectedTechno); // Pour vérifier les valeurs sélectionnées
  }

  // resaka scoring 
  // submitFeedBackAndScore(){
  //   const object = {
  //     id_tache:"iddddd",
  //     scoreClient: this.valueScore,
  //     commentaireClient : this.commentValue
  //   }
  //   console.log("Objeeeeeeeeeeect",object);
  // }
   // Fonction appelée lors de la sélection d'une étoile
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

  submitFeedBackAndScore() {
    if (this.preciseScore !== null) {
      console.log(`Commentaire: ${this.commentValue}`);
      console.log(`Score étoile: ${this.valueScore}, Score précis: ${this.preciseScore}`);
      console.log("idTache ",this.idTaskToRate);

      //id_tache/commentaireChefProjet/id_employe_assigne
      const object = { 
        id_tache: this.idTaskToRate,
        commentaireChefProjet: this.commentValue,
        scoreChefProjet: this.preciseScore,
        id_employe_assigne: this.idEmplAssigne
        };
  
      this.tacheSprintService
        .saveScoreCP(object)
        .subscribe((result) => {
          console.log(result.message);
          console.log("score enregistré")
          this.tacheSprintService
          .updateTaskEtat(this.idTaskToRate,2)
          .subscribe((result) => {
            //console.log(result.message);
            console.log("etat modifié")
            this.closeModal();
          });


          this.closeModal();
        });


      
    } else {
      alert('Veuillez entrer un score précis.');
    }
  }


   getPrediction(){
    this.isLoadingPredict=true;
    console.log("valueCheckBox",this.selectedTechno);
    // Attendre 5 secondes (5000 millisecondes)
    setTimeout(() => {
      this.isLoadingPredict = false;
      this.showPredict = true
    }, 5000); // 5000 millisecondes = 5 secondes
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


  // TRAITEMENT CDC:
    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0];
    }


    // getDataFromAPI() {
    //   if (!this.selectedFile) {
    //     console.error('Aucun fichier sélectionné.');
    //     return; // On arrête la fonction si aucun fichier n'est sélectionné
    //   }
    //   const formData = new FormData();
    //   formData.append('file', this.selectedFile); // Ici `selectedFile` est garanti d'être défini
    //   this.http.post<any>('http://127.0.0.1:5000/getDataCDC', formData).subscribe({
    //     next: (response) => {
    //       // Si 'tasksCDC' est une chaîne de caractères JSON, vous devez la parser
    //       if (typeof response.tasksCDC === 'string') {
    //         try {
    //           this.tasksCDC = JSON.parse(response.tasksCDC);
    //         } catch (e) {
    //           console.error('Erreur de parsing JSON pour tasksCDC', e);
    //         }
    //       } else {
    //         this.tasksCDC = response.tasksCDC; // Si c'est déjà un tableau, l'assigner directement
    //       }
    //     },
    //     error: (error) => {
    //       console.error('Erreur lors de la récupération des données', error);
    //     }
    //   });
    // }

    uploadCdc() {
      if (!this.selectedFile) {
        console.error('Aucun fichier sélectionné.');
        return; // On arrête la fonction si aucun fichier n'est sélectionné
      }
    
      const formData = new FormData();
      formData.append('file', this.selectedFile); // Ici `selectedFile` est garanti d'être défini

      this.isLoading = true; // Début du chargement
    
      // Envoi du fichier au backend Flask
      this.http.post<any>('http://127.0.0.1:5000/getDataCDC', formData).subscribe(
        (response) => {
          console.log('Contenu du fichier:', response);
          console.log("response",response)
          // Accède à la propriété "data" sans erreur de type
          this.extractedText = response.contenuCDC;
          this.listTaskCDC=JSON.parse(response.tasksCDC);

          // Afficher le textarea seulement si des tâches sont présentes
          this.showTasks = this.listTaskCDC && this.listTaskCDC.length > 0;

          // Ensuite, forcer Angular à détecter les changements
          //this.cdRef.detectChanges();
          // Forcer la détection des changements
            this.zone.run(() => {
              this.cdRef.detectChanges();
            });

           // Fin du chargement
          this.isLoading = false; // Arrêt du chargement

        },
        (error) => {
          console.error('Erreur lors du téléchargement du fichier:', error);
        }
      );
      

    }

   // Méthode pour supprimer un élément à un indice donné
    deleteListeTache(index: number): void {
      if (index > -1 && index < this.listTaskCDC.length) {
        this.listTaskCDC.splice(index, 1); // Supprime l'élément à l'indice spécifié
      }
    }


    //INSERT INTO crm_tache (id, nom, descTache, statut, id_projet)
    // VALUES ('CRMTCH_21', 'Tache 1', 'Desc tache 1','CRMPJ1');
    insertBackLogTask() {
      // const tasks = [
      //   'Design de la structure application',
      //   'Création interface de connexion',
      //   'Amélioration du tableau de bord',
      //   // Ajoute d'autres tâches ici
      // ];
    
      // Crée un tableau de `taskBackLog` basé sur `tasks`
      const taskBackLogs = this.listTaskCDC.map(task => ({
        id: this.idTaskToRate,   // Identifiant fixe ou variable pour chaque tâche
        nom: task,               // Ici, on injecte la chaîne de caractères dans la propriété 'nom'
        descTache: "",           // Propriété fixe
        statut: 0,               // Propriété fixe
        id_projet: this.idProjet // Propriété fixe ou variable
      }));
    
      // Appel API pour sauvegarder toutes les tâches en une seule requête
      this.tacheSprintService.insertBackLogs(taskBackLogs).subscribe(response => {
        console.log('All tasks saved successfully');
        this.closeModal();
          this.refreshData();
      }, error => {
        console.error('Error saving tasks:', error);
      });
    }
    
    createSprint() {
      const id = this.route.snapshot.params['id'];
      const object = {
        nom: this.nomSprint,
        date_creation: this.startdate,
        date_echeance: this.enddate,
        id_projet: id,
        statut: 0
      };
    
      this.tacheSprintService
        .createSprint(object)
        .subscribe((result) => {
          console.log(result.message);
          this.nomSprint = "";
          this.startdate = "";
          this.enddate = "";
          this.closeModal();
          this.refreshData();
        });
    }


    // attribuerTache() {
    //     const object = { 
    //       id: "string",
    //       priorite: number,
    //       temps_estime: string,
    //       id_employe_assigne: string,
    //       id_sprint: string,
    //       statut: string
    //   };
    
    //     this.tacheSprintService
    //       .saveScoreCP(object)
    //       .subscribe((result) => {
    //         console.log(result.message);
    //         console.log("score enregistré")
    //         this.tacheSprintService
    //         .updateTaskEtat(this.idTaskToRate,2)
    //         .subscribe((result) => {
    //           //console.log(result.message);
    //           console.log("etat modifié")
    //           this.closeModal();
    //         });
  
  
    //         this.closeModal();
    //       });
  
    // }
    
    


    // const taskbackLog = { 
    //   id: this.idTaskToRate,
    //   nom:"" ,
    //   descTache: "",
    //   statut: 0,
    //   id_projet:this.idProjet
    //   };

      // const object = { 
      //   id_tache: this.idTaskToRate,
      //   commentaireChefProjet: this.commentValue,
      //   scoreChefProjet: this.preciseScore,
      //   id_employe_assigne: this.idEmplAssigne
      //   };
    
    


}
