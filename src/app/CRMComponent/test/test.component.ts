import { CrmCommentaireTacheLib } from '@/app/CRMinterface/crm-commentaire-tache-lib';
import { TacheSprintService } from '@/app/CRMservice/tache-sprint.service';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './test.component.html',
  styles: []
})
export class TestComponent {
  @Input() title: string = 'Test';
  valueScore=1;
  commentValue="";
  listeCommentaire: CrmCommentaireTacheLib[] = [];

  constructor(private tacheSprintService: TacheSprintService) {
  }

  
  ngOnInit() {
    // const id = this.route.snapshot.params['id']; 
    // this.idProjet=id; 
    // const permission = this.route.snapshot.params['permission'];
    // console.log("id:"+id);
    // console.log("permission:"+permission);
    //this.permission=permission;

    this.tacheSprintService.getCommentaireTache('CRMTCH_10').subscribe(result => {
      this.listeCommentaire = result.data;
      console.log("result.data",result.data)
    });


  }

  //scoreClient scoreChefProjet commentaireClient commentaireChefProjet (mbol misy cdt sy onnée tsy ampy)
  submitFeedBackAndScore(){
    const object = {
      id_tache:"iddddd",
      scoreClient: this.valueScore,
      commentaireClient : this.commentValue
    }
    console.log("Objeeeeeeeeeeect",object);
  }
}
