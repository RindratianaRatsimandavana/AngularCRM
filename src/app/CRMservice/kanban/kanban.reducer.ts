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
  todo: KanbanTaskType[],      // Tâches à faire (To Do)
  inProgress: KanbanTaskType[],// Tâches en cours (In Progress)
  done: KanbanTaskType[],      // Tâches terminées (Done)
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
    const todo = tasks.filter(task => task.sectionId === 'To Do');
    const inProgress = tasks.filter(task => task.sectionId === 'In Progress');
    const done = tasks.filter(task => task.sectionId === 'Done');
    const review = tasks.filter(task => task.sectionId === 'Review');
    
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
