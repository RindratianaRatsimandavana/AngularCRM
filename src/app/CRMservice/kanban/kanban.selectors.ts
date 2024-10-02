import { createFeatureSelector, createSelector } from '@ngrx/store'
import type { KanbanState } from './kanban.reducer'

// export const selectDataState = createFeatureSelector<KanbanState>('Task')
export const selectDataState = createFeatureSelector<KanbanState>('Task')


// export const getKanbanData = createSelector(
//   selectDataState,
//   (state: KanbanState) => state.task
// )

export const getKanbanData = createSelector(
  selectDataState,
  (state: KanbanState) => state.tasks
)

export const getKanbanBoard = createSelector(
  selectDataState,
  (state: KanbanState) => state.board ?? []  // Utilise "?? []" pour éviter l'erreur si "board" est undefined
)


// Sélecteur pour les tâches "A faire"
export const getTodoTasks = createSelector(
  selectDataState,
  (state: KanbanState) => state.todo
);

// Sélecteur pour les tâches "En cours"
export const getInProgressTasks = createSelector(
  selectDataState,
  (state: KanbanState) => state.inProgress
);

// Sélecteur pour les tâches "Terminé"
export const getDoneTasks = createSelector(
  selectDataState,
  (state: KanbanState) => state.done
);
