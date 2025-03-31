import { Component } from '@angular/core'
import { ClientsComponent } from './clients/clients/clients.component';
import { StateComponent } from './state/state/state.component';
import { TimelineComponent } from './timeline/timeline/timeline.component';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-dashboard',
  standalone: true,
  imports: [
    StateComponent,
    TimelineComponent,
    ClientsComponent,
    RouterLink
  ],
  templateUrl: './project-dashboard.component.html',
  styleUrl: './project-dashboard.component.scss'
})

export class ProjectDashboardComponent {
  idProjet?:string;
  permission?:string;

  constructor(private route:ActivatedRoute) {
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id']; 
    const permission = this.route.snapshot.params['permission'];

    this.idProjet=id; 
    this.permission=permission;
  }
}
