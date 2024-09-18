import { Component } from '@angular/core';
import { UtilsService } from '@/app/core/service/utils.service'
import { TacheSprintService } from '@/app/CRMservice/tache-sprint.service';
import { ActivatedRoute } from '@angular/router';
import { CrmTacheLib } from '@/app/CRMinterface/crm-tache-lib';
import { CommonModule } from '@angular/common';
import {NgbAccordionModule,NgbProgressbarModule} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [NgbAccordionModule,NgbProgressbarModule,CommonModule,NgbAccordionModule,NgbProgressbarModule],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent {
  tacheTemp: CrmTacheLib[] = [];
//  tachesParSprint: any = {};
tachesParSprint: { [sprintId: string]: CrmTacheLib[] } = {}; 

 // idProject=this.route.snapshot.params['id'];

  constructor(private tacheSprintService: TacheSprintService,private route:ActivatedRoute,public service :UtilsService) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.tacheSprintService.getTaches(id).subscribe(result => {
      this.tacheTemp = result.data;
      // console.log(result.data)
      // console.log("resultaaaaaaaaaaaaaaat",this.tacheTemp);
      this.tachesParSprint = this.groupBySprint(result.data);
      console.log(this.tachesParSprint)
      // console.log("verificationnnnnnnnnnnnnnnnnn",this.groupBySprint(result.data))
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
      // console.log("grouped");
      // console.log(grouped);
      return grouped;
    }, {});
  }

  trackById(index: number, task: any): number {
    return task.id; // Assurez-vous que chaque tâche a un ID unique
  }
  
}
