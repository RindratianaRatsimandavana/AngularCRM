import { CRMMembreProjet } from '@/app/CRMinterface/crmmembre-projet';
import { ProjectService } from '@/app/CRMservice/project.service';
import { Component, Input } from '@angular/core';

import {inject, type TemplateRef } from '@angular/core'
import {
  NgbModal,
  NgbModalConfig,
  type NgbModalOptions,
} from '@ng-bootstrap/ng-bootstrap'
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap'

import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms'; 
import {AutocompleteLibModule} from 'angular-ng-autocomplete';


import { TempMembreProjet } from '@/app/CRMinterface/temp-membre-projet';

import { RouterLink } from '@angular/router';
import { GeneralService } from '@/app/CRMservice/general.service';
import { User } from '@/app/CRMinterface/user';
import { CrmEmployeCompetence } from '@/app/CRMinterface/crm-employe-competence';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [NgbProgressbarModule,NgbAlertModule,FormsModule,AutocompleteLibModule,RouterLink,CommonModule],
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.scss'
})
export class DocumentListComponent {

  @Input() title: string = 'Vos dossiers';

  projectList: CRMMembreProjet[] = [];

  private modalService = inject(NgbModal)
  private generalService = inject(GeneralService)

  user!: User
  listCompetenceEmp: CrmEmployeCompetence[] = [];

  newMembre: string = ''; // Temp input for adding new members
  membres: TempMembreProjet[] = []; // Array for TempMembreProjet objects

  selectedPermissions: string = '';

  data = [
    { id: 'FWU13', email: 'jane@gmail.com' },
    { id: 'FWU14', email: 'claude@gmail.com' },
    { id: 'FWU15', email: 'smarthe@gmail.com' },
    { id: 'FWU16', email: 'harry@gmail.com' }
  ];

  public keyword = "email"; // Search by email
  selectedUserId: string = ''; // Store selected user id

  nomProjet= "";
  startdate = "";
  enddate = "";
  id_type_projet = "";
  id_type_suivi = "";
  id_client = "";
  description = "";
  statut= 1;

  idNewProject = "";

  constructor(
    private projectService:ProjectService
  ){ }

  getAllUserProject(){
    // const userString = localStorage.getItem('user');
    // const userObject = userString ? JSON.parse(userString) : null; // decommentenca au cas où
    this.projectService.getAllUserProject(this.user.id,"CRMTP2")
    .subscribe(result => {
      console.log("hi log resultat");
      console.log(result);
      console.log(result.data);
      console.log("fin log resultat");
      this.projectList = result.data;
    });    
  }

  getAllEmplCompetence(){
    this.generalService.getEmpCompetence(this.user.id)
    .subscribe(result => {
      console.log("Liste compétence");
      console.log(result);
      console.log(result.data);
      this.listCompetenceEmp = result.data;
    });    
  }

  
  ngOnInit() {
    const userString = localStorage.getItem('user');
    const userObject = userString ? JSON.parse(userString) : null;
    this.user=userObject;
    this.getAllUserProject();
    this.getAllEmplCompetence()
    // const id = this.route.snapshot.params['id'];
    // this.gene.getAssignmentByProf()
    // .subscribe(assignment => {
    //   this.assignments = assignment;
    // });
  }

  checkCompetenceForDocument() {
    const competenceRecherchees = ['CRMCOMP30','CRMCOMP31'];
    const trouve = this.listCompetenceEmp.some(item => 
      competenceRecherchees.includes(item.id_competence ?? '')
    );
  
    if (trouve) {
      return true
    } else {
      return false
    }
  }
  

  
  // Handle the event when a user is selected from autocomplete
  selectEvent(item: any) {
    console.log('tatooooSelected item: ', item);
    this.newMembre = item.email; // Store selected email in newMembre
    this.selectedUserId = item.id; // Store selected user's ID
    console.log("après selected newMembre ",this.newMembre);
    console.log("après selected selectedUserId ",this.selectedUserId);
  }

  openModal(content: TemplateRef<HTMLElement>, options: NgbModalOptions) {
    this.modalService.open(content, options)
  }

  // Function to add a new member to the list
  ajouterMembre() {
    if (this.newMembre.trim()) {
      const newMemberObject: TempMembreProjet = {
        id_employe: this.selectedUserId, 
        id_projet: this.idNewProject,
        permission: this.selectedPermissions.trim() // You can modify this value as needed
      };
      this.membres.push(newMemberObject);
      this.newMembre = '';
      this.selectedPermissions = ''; // Reset the input after adding the member
      this.selectedUserId = '';
    }
  }

  // Function to delete a member by index
  // supprimerMembre(val?: string) {
  //   const index = this.membres.findIndex(x => x.valFormInput === val);

  //   this.membres.splice(index, 1);
  // }

  supprimerMembre(val?: string) {
    // Trouver l'index du membre à supprimer
    const index = this.membres.findIndex(membre => membre.id_employe === val);
    
    console.log("index ",index);
    // Vérifier si l'index est valide avant de supprimer
    if (index !== -1) {
      this.membres.splice(index, 1);
    }
  }



 
  
  onSubmit(){
    const object = {
      nom: this.nomProjet,
      date_creation : this.startdate,
      date_echeance : this.enddate,
      id_type_projet : this.id_type_projet,
      id_type_suivi : this.id_type_suivi,
      id_client : this.id_client,
      description : this.description,
      statut: this.statut
    }

    this.projectService
      .createProject(object)
      .subscribe((result) => {
        console.log(result.message);
        this.idNewProject=result.data.id
        console.log("idNewProject",result.data.id);
        console.log("idNewProject",this.idNewProject);
        this.refreshIdProjet(this.idNewProject);
        this.projectService.saveMembers(this.membres).subscribe(response => {
          console.log('Members saved successfully!', response.message);
        }, error => {
          console.error('Error saving members', error);
        });


      });
  }

  refreshIdProjet(idProjet:string){
    for(let i=0;i<this.membres.length;i++){
      this.membres[i].id_projet=idProjet;
    }
  }


}
