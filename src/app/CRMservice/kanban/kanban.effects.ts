import { Injectable } from '@angular/core'
import { of } from 'rxjs'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, mergeMap, tap } from 'rxjs/operators'

// Action
import {
  addBoard,
  addBoardFailure,
  addBoardSuccess,
  addKanban,
  addKanbanFailure,
  addKanbanSuccess,
  deleteBoard,
  deleteBoardFailure,
  deleteBoardSuccess,
  fetchKanbanBoard,
  fetchKanbanBoardFailure,
  fetchKanbanBoardSuccess,
  fetchKanbanTask,
  fetchKanbanTaskFailure,
  fetchKanbanTaskSuccess,
  moveTaskKanban,
  moveTaskKanbanSuccess,
  updateKanban,
  updateKanbanFailure,
  updateKanbanSuccess,
} from './kanban.action'
//import { CrudService } from '@/app/core/service/crud.service'
import { CrudService } from '@/app/core/service/crud.service'

@Injectable()
export class KanbanEffects {
  // Board
  fetchBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchKanbanBoard),
      mergeMap(() =>
        this.CrudService.fetchBoard().pipe(
          map((board) => fetchKanbanBoardSuccess({ board })),
          catchError((error) => of(fetchKanbanBoardFailure({ error })))
        )
      )
    )
  )

  addKanbanBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addBoard),
      mergeMap(({ newData }) =>
        this.CrudService.addKanbanBoard(newData).pipe(
          map(() => addBoardSuccess({ newData })),
          catchError((error) => of(addBoardFailure({ error })))
        )
      )
    )
  )

  deleteKanbanBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteBoard),
      mergeMap(({ id }) =>
        this.CrudService.deleteKanbanBoard(id).pipe(
          map(() => deleteBoardSuccess({ id })),
          catchError((error) => of(deleteBoardFailure({ error })))
        )
      )
    )
  )

  // Task
  // fetchTask$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(fetchKanbanTask),
  //     mergeMap(() =>
  //       this.CrudService.fetchTask().pipe(
  //         map((task) => fetchKanbanTaskSuccess({ task })),
  //         catchError((error) => of(fetchKanbanTaskFailure({ error })))
  //       )
  //     )
  //   )
  // )


  // fetchTask$ = createEffect(() => 
  //   this.actions$.pipe(
  //     ofType(fetchKanbanTask),
  //     mergeMap(() =>
  //       this.CrudService.fetchTask().pipe(
  //         map((tasks) => fetchKanbanTaskSuccess({ tasks })),  // Changement de "task" à "tasks"
  //         catchError((error) => of(fetchKanbanTaskFailure({ error })))
  //       )
  //     )
  //   )
  // )
 
  // fetchTask$ = createEffect(() => 
  //   this.actions$.pipe(
  //     ofType(fetchKanbanTask),
  //     mergeMap(() =>
  //       this.CrudService.fetchTask().pipe(
  //         map((tasks) => {
  //           console.log("tonga ve")
  //           // console.log(tasks);  // Vérification des données reçues
  //           return fetchKanbanTaskSuccess({ tasks });
  //         }),
  //         catchError((error) => of(fetchKanbanTaskFailure({ error })))
  //       )
  //     )
  //   )
  // );
  
  fetchTask$ = createEffect(() => 
    this.actions$.pipe(
      ofType(fetchKanbanTask),
      mergeMap((action) => {
        // Utiliser action.projectID comme paramètre
        return this.CrudService.fetchTask(action.projectID, action.permission).pipe(
          // Mapper la réponse de l'API vers une action success
          map((tasks) => {
            return fetchKanbanTaskSuccess({ tasks });
          }),
          // Gestion d'erreur en cas de problème
          catchError((error) => {
            return of(fetchKanbanTaskFailure({ error }));
          })
        );
      })
    )
  );

  moveTask$ = createEffect(() => 
    this.actions$.pipe(
      ofType(moveTaskKanban),
      mergeMap((action) => {
        // Utiliser action.projectID comme paramètre
        return this.CrudService.moveTask(action.taskId, action.statut,action.projectID, action.permission).pipe(
          // Mapper la réponse de l'API vers une action success
          map((tasks) => {
            return moveTaskKanbanSuccess({ tasks });
          }),
          // // Gestion d'erreur en cas de problème
          // catchError((error) => {
          //   return of(fetchKanbanTaskFailure({ error }));
          // })
        );
      })
    )
  );
  

   
  
  

  addKanban$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addKanban),
      mergeMap(({ newData }) =>
        this.CrudService.addKanbanTask(newData).pipe(
          map(() => addKanbanSuccess({ newData })),
          catchError((error) => of(addKanbanFailure({ error })))
        )
      )
    )
  )

  updateKanbaData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateKanban),
      mergeMap(({ updatedData }) =>
        this.CrudService.updatekanbantask(updatedData).pipe(
          map(() => updateKanbanSuccess({ updatedData })),
          catchError((error) => of(updateKanbanFailure({ error })))
        )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private CrudService: CrudService
  ) {}
}
