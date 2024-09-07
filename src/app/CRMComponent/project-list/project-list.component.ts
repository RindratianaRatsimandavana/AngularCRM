import { CRMMembreProjet } from '@/app/CRMinterface/crmmembre-projet';
import { ProjectService } from '@/app/CRMservice/project.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent {
  projectList: CRMMembreProjet[] = [];
  
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

}
