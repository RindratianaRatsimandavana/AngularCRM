import { Component } from '@angular/core'
import { InviteMemberComponent } from './components/invite-member/invite-member.component';
import { KanbanTasksComponent } from './components/kanban-tasks/kanban-tasks.component';
import { Observable } from 'rxjs';
import { KanbanTaskType } from './data';
import { select, Store } from '@ngrx/store';
import { getDoneTasks, getInProgressTasks, getTodoTasks } from '@/app/CRMservice/kanban/kanban.selectors';
// import { InviteMemberComponent } from './components/invite-member/invite-member.component'
// import { KanbanTasksComponent } from './components/kanban-tasks/kanban-tasks.component'

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [InviteMemberComponent, KanbanTasksComponent],
  templateUrl: './kanban-board.component.html',
  styles: ``,
})
export class KanbanBoardComponent {
  todoTasks$: Observable<KanbanTaskType[]>;
  inProgressTasks$: Observable<KanbanTaskType[]>;
  doneTasks$: Observable<KanbanTaskType[]>;

  constructor(private store: Store) {
    this.todoTasks$ = this.store.pipe(select(getTodoTasks));
    this.inProgressTasks$ = this.store.pipe(select(getInProgressTasks));
    this.doneTasks$ = this.store.pipe(select(getDoneTasks));
  }

  ngOnInit() {
  }

}
