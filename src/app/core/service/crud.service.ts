import { Injectable } from '@angular/core'
import { map, Observable, of } from 'rxjs'

import { defaultEvents } from '@/app/store/calendar/data'
import type { EventInput } from '@fullcalendar/core'
import { HttpClient } from '@angular/common/http'
import { TacheSprintService } from '@/app/CRMservice/tache-sprint.service'
import { CrmTacheLib } from '@/app/CRMinterface/crm-tache-lib'
import { kanbanSectionsData, KanbanSectionType, kanbanTasksData, KanbanTaskType } from '@/app/CRMComponent/kanban-board/data'

@Injectable({ providedIn: 'root' })
export class CrudService {

  private apiUrl = 'http://localhost:3000/api/erp/CrmTache/';

  constructor(private http: HttpClient,private tacheSprintService: TacheSprintService) {}

  /***
   * Get
   */
  fetchCalendarEvents(): Observable<EventInput[]> {
    return of(defaultEvents)
  }

  addCalendarEvents(newData: EventInput): Observable<EventInput[]> {
    let newEvents = [...defaultEvents, newData] // Create a new array by spreading defaultEvents and adding newData
    return of(newEvents)
  }

  updateCalendarEvents(updatedData: EventInput): Observable<EventInput[]> {
    const index = defaultEvents.findIndex((item) => item.id === updatedData.id)
    let updatedEvents = defaultEvents.slice()
    if (index !== -1) {
      updatedEvents[index] = updatedData
    }
    return of(updatedEvents)
  }

  deleteCalendarEvents(id: string): Observable<EventInput[]> {
    return of(defaultEvents.filter((item) => item.id !== id))
  }

  // Kanban Tasks
  fetchBoard(): Observable<KanbanSectionType[]> {
    return of(kanbanSectionsData)
  }

  addKanbanBoard(newData: KanbanSectionType): Observable<KanbanSectionType[]> {
    let newTasks = [...kanbanSectionsData, newData] // Create a new array by spreading defaultEvents and adding newData
    return of(newTasks)
  }

  deleteKanbanBoard(id: string): Observable<KanbanSectionType[]> {
    return of(kanbanSectionsData.filter((item) => item.id !== id))
  }

  // fonction initiale
  // fetchTask(): Observable<KanbanTaskType[]> {
  //   return of(kanbanTasksData)
  // }

  //CRM
   // Fonction pour convertir CrmTacheLib en KanbanTaskType
  //  fetchTask(): Observable<KanbanTaskType[]> {
  //   console.log("tatooooooooo")
  //   return this.tacheSprintService.getTaches('CRMPJ2').pipe(
  //     map((response: { data: CrmTacheLib[] }) => {
  //       // Transformation de CrmTacheLib[] en KanbanTaskType[]
  //       const listeTacheProjet: CrmTacheLib[] = response.data;
  //       console.log("teeeeeeeeeeest",listeTacheProjet)

  //       return listeTacheProjet.map((tache: CrmTacheLib) => {
  //         return {
  //           id: tache.id ?? '',
  //           sectionId: this.getSectionIdFromStatut(tache.statut), // Par exemple, transformer statut en sectionId
  //           priority: this.getPriorityLabel(tache.priorite), // Transformer priorite en label
  //           title: tache.nom ?? '',
  //           description: tache.descTache ?? '',
  //           commentsCount: 0, // Si tu n'as pas de champ pour les commentaires
  //           totalTasks: 1, // Tu peux ajuster cela en fonction des sous-tâches
  //           completedTasks: tache.etat === 1 ? 1 : 0, // Si etat 1 est "complété"
  //           tags: [] // Ajouter des tags si nécessaire
  //         } as KanbanTaskType;
  //       });
  //     })
  //   );
  // }

  fetchTask(projectID: string, permission: string): Observable<KanbanTaskType[]> {
    // console.log("tatooooooooo")
    const userString = localStorage.getItem('user');
    const userObject = userString ? JSON.parse(userString) : null;
    return this.tacheSprintService.getTaches(projectID,userObject.id, permission).pipe(
      map((response: { data: CrmTacheLib[] }) => {
        const listeTacheProjet: CrmTacheLib[] = response.data;
        // console.log("teeeeeeeeeeest",listeTacheProjet)
        let res= listeTacheProjet.map((tache: CrmTacheLib) => ({
          id: tache.id ?? '',
          sectionId: this.getSectionIdFromStatut(tache.statut), // Assurez-vous que cette fonction renvoie une section valide
          priority: this.getPriorityLabel(tache.priorite),
          title: tache.nom ?? '',
          description: tache.descTache ?? '',
          commentsCount: 0,
          totalTasks: 1,
          completedTasks: tache.etat === 1 ? 1 : 0,
          tags: []
        }));
        // console.log(res);
        return res;
      })
    );
  }
  


  // Exemple de fonction pour mapper les priorités
  private getPriorityLabel(priorite?: number): string {
    switch (priorite) {
      case 1:
        return 'High';
      case 2:
        return 'Medium';
      case 3:
        return 'Low';
      default:
        return 'Medium';
    }
  }

  // Exemple de fonction pour mapper le statut à une section (To Do, Done, etc.)
  private getSectionIdFromStatut(statut?: number): string {
    switch (statut) {
      case 0:
        return 'To Do';
      case 3:
        return 'Done';
      case 2:
        return 'Review';
      case 1:
          return 'In Progress';
      default:
        return 'To Do';
    }
  }


  addKanbanTask(newData: KanbanTaskType): Observable<KanbanTaskType[]> {
    let newTasks = [...kanbanTasksData, newData] // Create a new array by spreading defaultEvents and adding newData
    return of(newTasks)
  }

  updatekanbantask(updatedData: KanbanTaskType): Observable<KanbanTaskType[]> {
    const index = kanbanTasksData.findIndex(
      (item) => item.id === updatedData.id
    )
    let updatedEvents = kanbanTasksData.slice()
    if (index !== -1) {
      updatedEvents[index] = updatedData
    }
    return of(updatedEvents)
  }
}
