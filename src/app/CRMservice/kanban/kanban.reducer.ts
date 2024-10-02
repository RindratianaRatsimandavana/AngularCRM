import { createReducer, on, Action } from '@ngrx/store'
import type { KanbanSectionType, KanbanTaskType } from './data'
import {
  addBoardSuccess,
  addKanbanSuccess,
  deleteBoardSuccess,
  fetchKanbanBoard,
  fetchKanbanBoardSuccess,
  fetchKanbanTask,
  fetchKanbanTaskSuccess,
  moveTaskKanban,
  moveTaskKanbanSuccess,
  updateKanbanSuccess,
} from './kanban.action'

//initial
// export type KanbanState = {
//   board: KanbanSectionType[]
//   task: KanbanTaskType[]
// }

export type KanbanState = {
  board: KanbanSectionType[],  // Gère les différentes colonnes du Kanban
  tasks: KanbanTaskType[],     // Toutes les tâches récupérées
  todo: KanbanTaskType[],      // Tâches à faire (A faire)
  inProgress: KanbanTaskType[],// Tâches en cours (En cours)
  done: KanbanTaskType[],      // Tâches terminées (Terminé)
}

//initial
// export const initialState: KanbanState = {
//   board: [],
//   task: [],
// }

export const initialState: KanbanState = {
  board: [],
  tasks: [],
  todo: [],
  inProgress: [],
  done: []
}



// export const KanbanReducer = createReducer(
//   initialState,
//   on(fetchKanbanBoard, (state) => {
//     return { ...state }
//   }),
//   on(fetchKanbanBoardSuccess, (state, { board }) => {
//     return { ...state, board }
//   }),

//   on(addBoardSuccess, (state, { newData }) => {
//     return { ...state, board: [...state.board, newData], error: null }
//   }),

//   on(deleteBoardSuccess, (state, { id }) => {
//     return {
//       ...state,
//       board: state.board.filter((board) => board.id !== id),
//       error: null,
//     }
//   }),

//   on(fetchKanbanTask, (state) => {
//     return { ...state }
//   }),
//   on(fetchKanbanTaskSuccess, (state, { task }) => {
//     return { ...state, task }
//   }),

//   on(addKanbanSuccess, (state, { newData }) => {
//     return { ...state, task: [...state.task, newData], error: null }
//   }),

//   on(updateKanbanSuccess, (state, { updatedData }) => {
//     return {
//       ...state,
//       Kanban: state.task.map((task) =>
//         task.id === updatedData.id ? updatedData : task
//       ),
//       error: null,
//     }
//   })
// )

export const KanbanReducer = createReducer(
  initialState,
  on(fetchKanbanBoard, (state) => {
    return { ...state }
  }),
  on(fetchKanbanBoardSuccess, (state, { board }) => {
    return { ...state, board }
  }),

  on(addBoardSuccess, (state, { newData }) => {
    return { ...state, board: [...state.board, newData], error: null }
  }),

  on(deleteBoardSuccess, (state, { id }) => {
    return {
      ...state,
      board: state.board.filter((board) => board.id !== id),
      error: null,
    }
  }),

  on(fetchKanbanTask, (state) => {
    return { ...state }
  }),
  on(fetchKanbanTaskSuccess, (state, { tasks }: { tasks: KanbanTaskType[] }) => {
    const todo = tasks.filter(task => task.sectionId === 'A faire');
    const inProgress = tasks.filter(task => task.sectionId === 'En cours');
    const done = tasks.filter(task => task.sectionId === 'Terminé');
    const review = tasks.filter(task => task.sectionId === 'Revue');
    
    return { 
      ...state, 
      tasks, 
      todo, 
      inProgress, 
      done,
      review 
    };
  }),

  on(moveTaskKanban, (state) => {
    return { ...state }
  }),
  on(moveTaskKanbanSuccess, (state, { tasks }: { tasks: KanbanTaskType[] }) => {
    const todo = tasks.filter(task => task.sectionId === 'A faire');
    const inProgress = tasks.filter(task => task.sectionId === 'En cours');
    const done = tasks.filter(task => task.sectionId === 'Terminé');
    const review = tasks.filter(task => task.sectionId === 'Revue');
    
    return { 
      ...state, 
      tasks, 
      todo, 
      inProgress, 
      done,
      review 
    };
  }),

  on(addKanbanSuccess, (state, { newData }: { newData: KanbanTaskType }) => {
    return { ...state, tasks: [...state.tasks, newData], error: null }
  }),

on(updateKanbanSuccess, (state, { updatedData }: { updatedData: KanbanTaskType }) => {
    return {
      ...state,
      tasks: state.tasks.map((task) =>
        task.id === updatedData.id ? updatedData : task
      ),
      error: null,
    }
  })
)

// Selector
export function reducer(state: KanbanState | undefined, action: Action) {
  return KanbanReducer(state, action)
}
