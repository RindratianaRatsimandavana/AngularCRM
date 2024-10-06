import { CrmCommentaireTacheLib } from '@/app/CRMinterface/crm-commentaire-tache-lib';
import { CrmTacheLib } from '@/app/CRMinterface/crm-tache-lib';
import { User } from '@/app/CRMinterface/user';
import { TacheSprintService } from '@/app/CRMservice/tache-sprint.service';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms'; 


@Component({
  selector: 'app-task-cl-detail',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-cl-detail.component.html',
  styleUrl: './task-cl-detail.component.scss'
})
export class TaskClDetailComponent {
    
  @Input() title: string = 'Detail sur la tâche';
  detailTache!: CrmTacheLib ;
  listeCommentsTask: CrmCommentaireTacheLib[] = [];

  expediteur_id= "";
  destinataire_id= "";
  idTache= "";
  contenu= "";

  userObject!:User;
  constructor(private tacheSprintService: TacheSprintService,private route:ActivatedRoute,
    private cdRef: ChangeDetectorRef
  ) {
     
  }

//   +-----------------+--------------+------+-----+---------------------+-------+
// | Field           | Type         | Null | Key | Default             | Extra |
// +-----------------+--------------+------+-----+---------------------+-------+
// | id              | varchar(20)  | NO   | PRI | NULL                |       |
// | expediteur_id   | varchar(20)  | YES  | MUL | NULL                |       |
// | destinataire_id | varchar(20)  | YES  | MUL | NULL                |       |
// | idTache         | varchar(20)  | YES  | MUL | NULL                |       |
// | contenu         | varchar(255) | YES  |     | NULL                |       |
// | date_envoi      | date         | YES  |     | current_timestamp() |       |
// | statut          | int(11)      | YES  |     | 0                   |       |
// | etat            | int(11)      | NO   |     | 1                   |       |
// +-----------------+--------------+------+-----+---------------------+-------+

  ngOnInit() {
    //const idTache = this.route.snapshot.params['id']; 
   // console.log("id:"+idTache);

    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    this.userObject=user
    console.log("user",user);
    console.log(user);
    this.expediteur_id = user.id;
    console.log("this.expediteur_id",this.expediteur_id);
    
    // const userString = localStorage.getItem('user');
    // const userObject = userString ? JSON.parse(userString) : null;
    
    this.loadData();
    


    
 
  }

  refreshData() {
    // Ici, tu mets à jour les données de ton composant
    // Par exemple :
    this.loadData();
    
    // Ensuite, forcer Angular à détecter les changements
    this.cdRef.detectChanges();
  }

  loadData() {
    const idTache = this.route.snapshot.params['id']; 
    this.tacheSprintService.getCommentaireTache(idTache).subscribe(result => {
      this.listeCommentsTask= result.data;
    });

    
    this.tacheSprintService.getTacheByIdTache(idTache).subscribe(result => {
      console.log("result.data",result.data)
      this.detailTache = result.data[0];
      this.idTache= result.data[0].id;
      this.destinataire_id= result.data[0].id_employe_assigne;
      console.log("this.detailTache",this.detailTache)
      console.log("this.idTache",this.idTache);
      console.log("this.destinataire_id",this.destinataire_id);

    });
    
  }

  onSubmit(){
    console.log("onsubmit")
    const object = {
      expediteur_id: this.expediteur_id,
      destinataire_id : this.destinataire_id,
      idTache : this.idTache,
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


}
