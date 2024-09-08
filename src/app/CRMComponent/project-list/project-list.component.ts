import { CRMMembreProjet } from '@/app/CRMinterface/crmmembre-projet';
import { ProjectService } from '@/app/CRMservice/project.service';
import { Component } from '@angular/core';

import {inject, type TemplateRef } from '@angular/core'
import {
  NgbModal,
  NgbModalConfig,
  type NgbModalOptions,
} from '@ng-bootstrap/ng-bootstrap'
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap'

import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms'; // N'oubliez pas d'importer FormsModule pour ngModel
import { TempMembreProjet } from '@/app/CRMinterface/temp-membre-projet';



@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [NgbProgressbarModule,NgbAlertModule,FormsModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent {
  projectList: CRMMembreProjet[] = [];

  private modalService = inject(NgbModal)

  newMembre: string = ''; // Temp input for adding new members
  membres: TempMembreProjet[] = []; // Array for TempMembreProjet objects

  selectedPermissions: string = '';

  constructor(
    private projectService:ProjectService
  ){ }

  getAllUserProject(){
    const userString = localStorage.getItem('user');
    const userObject = userString ? JSON.parse(userString) : null;
    this.projectService.getAllUserProject(userObject.id)
    .subscribe(result => {
      console.log("hi log resultat");
      console.log(result);
      console.log(result.data);
      console.log("fin log resultat");
      this.projectList = result.data;
    });    
  }

  
  ngOnInit() {
    this.getAllUserProject()
    // const id = this.route.snapshot.params['id'];
    // this.gene.getAssignmentByProf()
    // .subscribe(assignment => {
    //   this.assignments = assignment;
    // });
  }

  
  openModal(content: TemplateRef<HTMLElement>, options: NgbModalOptions) {
    this.modalService.open(content, options)
  }

  // Function to add a new member to the list
  ajouterMembre() {
    if (this.newMembre.trim()) {
      const newMemberObject: TempMembreProjet = {
        id_membre: (this.membres.length + 1).toString(), // Generate a temporary ID
        valFormInput: this.newMembre.trim(),
        permission: this.selectedPermissions.trim() // You can modify this value as needed
      };
      this.membres.push(newMemberObject);
      this.newMembre = '';
      this.selectedPermissions = ''; // Reset the input after adding the member
    }
  }

  // Function to delete a member by index
  // supprimerMembre(val?: string) {
  //   const index = this.membres.findIndex(x => x.valFormInput === val);

  //   this.membres.splice(index, 1);
  // }

  supprimerMembre(val?: string) {
    // Trouver l'index du membre à supprimer
    const index = this.membres.findIndex(membre => membre.valFormInput === val);
    
    console.log("index ",index);
    // Vérifier si l'index est valide avant de supprimer
    if (index !== -1) {
      this.membres.splice(index, 1);
    }
  }
  

}
