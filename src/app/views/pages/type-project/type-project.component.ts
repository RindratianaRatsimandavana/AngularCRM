import { currentYear } from '@/app/common/constants'
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

}
