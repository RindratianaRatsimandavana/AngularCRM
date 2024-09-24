import { Component, inject, type OnInit, type TemplateRef } from '@angular/core'
import { kanbanSectionsData, KanbanSectionType, kanbanTasksData, KanbanTaskType } from '../../data'
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap'
//import { KanbanCardComponent } from '../kanban-card/kanban-card.component'
import { DragulaModule, DragulaService } from 'ng2-dragula'
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
  type UntypedFormGroup,
} from '@angular/forms'
import { CommonModule } from '@angular/common'
import { Store } from '@ngrx/store'
import { cloneDeep } from 'lodash'
import { KanbanCardComponent } from '../kanban-card/kanban-card.component'
import { fetchKanbanTask, fetchKanbanBoard, addKanban, deleteBoard, moveTaskKanban } from '@/app/CRMservice/kanban/kanban.action'
import { getKanbanData, getKanbanBoard } from '@/app/CRMservice/kanban/kanban.selectors'
import { filter, tap } from 'rxjs'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'kanban-tasks',
  standalone: true,
  imports: [
    NgbDropdownModule,
    KanbanCardComponent,
    DragulaModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './kanban-tasks.component.html',
  styles: ``,
})
export class KanbanTasksComponent implements OnInit {
  
  sectionsData!: KanbanSectionType[]
  taskList!: KanbanTaskType[]

  taskForm!: UntypedFormGroup
  submitted: boolean = false
  sectionId: string = ''

  dataLoaded = false

  private store = inject(Store)
  private modalService = inject(NgbModal)
  private fb = inject(UntypedFormBuilder)
  private dragulaService = inject(DragulaService)

  idProjet?:string;
  permission?:string;

  constructor(private route:ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id']; 
    const permission = this.route.snapshot.params['permission'];

    this.idProjet=id; 
    this.permission=permission;

    const userString = localStorage.getItem('user');
    const userObject = userString ? JSON.parse(userString) : null;

    console.log("idProjet",id);
    console.log("permission",permission);

    //const id = this.route.snapshot.params['id'];
    this.store.dispatch(fetchKanbanTask({projectID: id, permission:permission}))
    this.store.dispatch(fetchKanbanBoard())

    this.store.select(getKanbanData).pipe(
      filter(data => data.length > 0), // Only proceed if data is not empty
      tap(data => {
        this.taskList = cloneDeep(data)
        console.log(this.taskList) // This will log only once
        this.dataLoaded = true // Set flag to true when data is loaded
      })
    ).subscribe()

    this.store.select(getKanbanBoard).pipe(
      filter(data => data.length > 0), // Only proceed if data is not empty
      tap(data => {
        this.sectionsData = data
        console.log(this.sectionsData)
      })
    ).subscribe()

    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      id: ['', [Validators.required]],
      assigned: ['', [Validators.required]],
      description: ['', [Validators.required]],
      priority: ['low', [Validators.required]],
    })

    this.dragulaService
      .dropModel('DRAGULA_FACTS')
      .subscribe(({ el, target }) => {
        this.onDrop(el, target)
      })
  }

  trackByFn(index: number, item: KanbanTaskType): any {
    return item.id; // or any unique identifier
  }
  

  getTaskVarient(title: string) {
    let variant = 'primary'
    if (title === 'To Do') variant = 'pink'
    else if (title === 'In Progress') variant = 'warning'
    else if (title === 'Review') variant = 'success'
    else if (title === 'Done') variant = 'info'
    return variant
  }

  onDrop(el: any, target: any): void {
    const taskId = el.getAttribute('data-task-id')
    const targetSectionId = target.getAttribute('data-section-id')
    if (taskId && targetSectionId) {
      const task = this.taskList.find((t) => t.id === taskId)
      if (task) {
        task.sectionId = targetSectionId;
        let statut=0;
        if(targetSectionId==="501" || targetSectionId==="To Do"){
          statut=0;
        }
        else if(targetSectionId==="502" || targetSectionId==="In Progress"){
          statut=1;
        }
        else if(targetSectionId==="503" || targetSectionId==="Review"){
          statut=2;
        }
        else if(targetSectionId==="504" || targetSectionId==="Done"){
          statut=3;
        }
        this.store.dispatch(moveTaskKanban({taskId: taskId, statut, permission:this.permission!, projectID:this.idProjet!}))//?????????????????
      }
    }
  }

  getTaskPerSection(id: string) {
    return this.taskList ? this.taskList.filter((task) => task.sectionId == id) : []
  }

  get form() {
    return this.taskForm.controls
  }

  OpenTaskModel(content: TemplateRef<any>, id: string) {
    this.sectionId = id
    this.modalService.open(content)
  }

  addTask() {
    this.submitted = true
    if (this.taskForm.valid) {
      const newData = {
        sectionId: this.sectionId,
        totalTasks: 5,
        commentsCount: 0,
        completedTasks: 0,
        ...this.taskForm.value,
      }
      this.store.dispatch(addKanban({ newData }))
      this.modalService.dismissAll()
      this.taskForm.reset()
      this.submitted = false
    }
  }

  deleteTask(id: string) {
    this.store.dispatch(deleteBoard({ id }))
  }

  
}
