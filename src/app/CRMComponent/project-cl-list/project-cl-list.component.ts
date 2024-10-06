import { CrmProjet } from '@/app/CRMinterface/crm-projet';
import { ProjectService } from '@/app/CRMservice/project.service';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-project-cl-list',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './project-cl-list.component.html',
  styleUrl: './project-cl-list.component.scss'
})
export class ProjectClListComponent {
  @Input() title: string = 'Vos projets';
  projectList: CrmProjet[] = [];


  constructor(
    private projectService:ProjectService
  ){ }

  getAllUserProject(){
    const userString = localStorage.getItem('user');
    const userObject = userString ? JSON.parse(userString) : null;
    this.projectService.getAllClientProject(userObject.id,"CRMTP1")
    .subscribe(result => {
      console.log("projet client");
      console.log(result);
      console.log(result.data);
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

}
