import { CrmTacheLib } from '@/app/CRMinterface/crm-tache-lib';
import { TacheSprintService } from '@/app/CRMservice/tache-sprint.service';
import { ChangeDetectorRef, Component, inject, Input, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SimplebarAngularModule } from 'simplebar-angular'
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-document-detail',
  standalone: true,
  imports: [SimplebarAngularModule,CommonModule,FormsModule,RouterLink],
  templateUrl:'./document-detail.component.html',
  styleUrl: './document-detail.component.scss'
})
export class DocumentDetailComponent {

  modalRef: NgbModalRef | undefined;


  @Input() title: string = 'Chronologies des évenements';
 // modalnameTask?: string;
  modaldateDebutEnCours?: string;
  modalstatut?: number;

  modalnameTask = "";
  modaldescTask = "";
  dateEvent = "";

  // formnameTask?: string; 
  // formdateDebutEnCours?: Date;
  // formstatut?: number;

  private modalService = inject(NgbModal)
  listTask: CrmTacheLib[] = [];
  idProjet?:string;
  permission?:string;
  now: Date = new Date(); // Date actuelle
  constructor(private tacheSprintService: TacheSprintService,private route:ActivatedRoute, private cdRef: ChangeDetectorRef) {
      // Initialise le formulaire principal
    // this.backlogForm = this.fb.group({
    //   tasks: this.fb.array([]) // FormArray qui contiendra les formulaires pour chaque ligne de tâche
    // });
  }

  ngOnInit() {
    
    this.loadData();
  }

  loadData(){
    const id = this.route.snapshot.params['id']; 
    this.idProjet=id; 
    // const permission = this.route.snapshot.params['permission'];
    // console.log("id:"+id);
    // console.log("permission:"+permission);
    //this.permission=permission;

    this.tacheSprintService.getTachesJur(id).subscribe(result => {
      this.listTask = result.data;
      // this.idProjet=result.data.id_projet
      // this.permission=result.data.permission
      console.log("result.data",result.data)
      // console.log("resultaaaaaaaaaaaaaaat",this.tacheTemp);
      //this.tachesParSprint = this.groupBySprint(result.data);
      //console.log(this.tachesParSprint)
      // console.log("verificationnnnnnnnnnnnnnnnnn",this.groupBySprint(result.data))

      //this.initTaskForms(); // Initialiser les formulaires de chaque tâche

    });


    //tsy mety mipoitra 
    console.log("formattage date ",this.formatDateForInput(this.listTask[0].date_debutEnCours));
  }

  isSameDateWithoutTime(date1: string | Date | undefined, date2: string | Date | undefined): boolean {
    // Si l'une des dates est undefined, retourne false (pas de comparaison possible)
    if (!date1 || !date2) {
        return false;
    }

    // Normalise les dates sans l'heure
    const d1 = new Date(date1).setHours(0, 0, 0, 0);
    const d2 = new Date(date2).setHours(0, 0, 0, 0);

    // Compare uniquement les parties dates (année, mois, jour)
    return d1 === d2; 
  }

  isTaskInFuture(taskDate: Date | undefined): boolean {
    return taskDate ? taskDate > this.now : false;
  }

  isTaskInPast(taskDate: Date | undefined): boolean {
    return taskDate ? taskDate < this.now : false;
  }

  openModal(content: TemplateRef<HTMLElement>, options: NgbModalOptions,nameTask?:string,dateDebutEnCours?:Date
    ,statut?:number) 
  {
    console.log("nameTask",nameTask);
    console.log("dateDebutEnCours",dateDebutEnCours);
    console.log("statut",statut);
    //this.modalnameTask = nameTask;
    console.log("dateDebutEnCours.type",) 
    //this.modaldateDebutEnCours = dateDebutEnCours;
    this.modaldateDebutEnCours = this.formatDateForInput(dateDebutEnCours);
    console.log('modaldateDebutEnCours',this.modaldateDebutEnCours)
    this.modalstatut = statut;
    console.log("this.modalnameTask",this.modalnameTask);
    console.log("this.modaldateDebutEnCours",this.modaldateDebutEnCours);
    console.log("this.modalstatut",this.modalstatut);
    this.modalRef =this.modalService.open(content, options)
  }

  modifierTache(){

  }

  marqueFini(idTask?: string){
    this.tacheSprintService.updateSousTaskStatus(idTask, 3).subscribe(
      (response) => {
        console.log('Sous-tâche mise à jour avec succès', response);
        location.reload();
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de la sous-tâche', error);
      }
    );

  }

  formatDateForInput(date?: Date): string {
    return date?date.toISOString().slice(0, 16):'date inconnue'; // Garder seulement la date et l'heure
  }

  // formatDateForInput(date: any): string {
  //   // Vérifie si c'est une date valide avant d'utiliser toISOString
  //   console.log("date.type");
  //   console.log(date)
  //   console.log(date.type);
  //   if (date instanceof Date && !isNaN(date.getTime())) {
  //     return date.toISOString().slice(0, 16); // Garder seulement la date et l'heure
  //   }
  //   return ''; // Retourne une chaîne vide si la date est invalide
  // }

  openModalSimple(content: TemplateRef<HTMLElement>, options: NgbModalOptions) {
    this.modalService.open(content, options)
  }

  addTache(){
    if (!this.idProjet) {
      console.error("ID du projet non défini");
      return;
    }

    
  
    const object : any= { 
      id:'CRMPJ_2',
      nom: this.modalnameTask,
      descTache: this.modaldescTask,
      date_debutEnCours: this.dateEvent,
      id_employe_assigne:'FWU15'
    };
  
    this.tacheSprintService.saveTask(object).subscribe((result) => {
      this.closeModal();
    });
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

   

       
     


    
  
  }


