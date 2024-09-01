import { currentYear } from '@/app/common/constants'
import { Userole } from '@/app/interfaceCRM/userole';
import { GeneralService } from '@/app/serviceCRM/general.service';
import { Component } from '@angular/core'
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap'
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-type-project',
  standalone: true,
  imports: [NgbProgressbarModule,NgbAlertModule],
  templateUrl: './type-project.component.html',
  styleUrl: './type-project.component.scss'
})
export class TypeProjectComponent {

  useroles: Userole[] = [];
  
  constructor(/*public dialog: MatDialog,private route:ActivatedRoute,private router:Router,*/
    private generalService:GeneralService
  ){ }

  private correspondancePromotion = new Map<String, String>([
    ['665795e56100947559e9d050', 'Promotion 1'],
    ['665795ee6100947559e9d053', 'Promotion 2']
  ]);

  getUserRole(){
    this.generalService.getAllUserRole()
    .subscribe(result => {
      console.log("hi log resultat");
      console.log(result);
      console.log(result.data);
      console.log("fin log resultat");
      this.useroles = result.data;
    });    
  }

  
  ngOnInit() {
    this.getUserRole()
    // const id = this.route.snapshot.params['id'];
    // this.gene.getAssignmentByProf()
    // .subscribe(assignment => {
    //   this.assignments = assignment;
    // });
  }

 

  
}
