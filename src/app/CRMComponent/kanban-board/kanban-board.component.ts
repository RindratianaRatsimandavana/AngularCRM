import { Component, Input } from '@angular/core'
import { InviteMemberComponent } from './components/invite-member/invite-member.component';
import { KanbanTasksComponent } from './components/kanban-tasks/kanban-tasks.component';
import { Observable } from 'rxjs';
import { KanbanTaskType } from './data';
import { select, Store } from '@ngrx/store';
import { getDoneTasks, getInProgressTasks, getTodoTasks } from '@/app/CRMservice/kanban/kanban.selectors';
// import { InviteMemberComponent } from './components/invite-member/invite-member.component'
// import { KanbanTasksComponent } from './components/kanban-tasks/kanban-tasks.component'

import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [InviteMemberComponent, KanbanTasksComponent,RouterLink],
  templateUrl: './kanban-board.component.html',
  styles: ``,
})
export class KanbanBoardComponent {
  @Input() title: string = 'Vue Kanban des tâches';

  todoTasks$: Observable<KanbanTaskType[]>;
  inProgressTasks$: Observable<KanbanTaskType[]>;
  doneTasks$: Observable<KanbanTaskType[]>;

  idProjet?:string;
  permission?:string;

  constructor(private store: Store,private route:ActivatedRoute) {
    this.todoTasks$ = this.store.pipe(select(getTodoTasks));
    this.inProgressTasks$ = this.store.pipe(select(getInProgressTasks));
    this.doneTasks$ = this.store.pipe(select(getDoneTasks));
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id']; 
    const permission = this.route.snapshot.params['permission'];

    this.idProjet=id; 
    this.permission=permission;

    const userString = localStorage.getItem('user');
    const userObject = userString ? JSON.parse(userString) : null;
  }

}
