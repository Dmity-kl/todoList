import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";

type  ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusType | changeTaskTitleType
    | AddTodoListActionType | RemoveTodoListActionType

export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    todoListID: string
    id: string

};
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todoListID: string
}
export type ChangeTaskStatusType = {
    type: 'CHANGE-TASK-STATUS'
    id: string
    taskStatus: boolean
    todoListID: string
}
export type changeTaskTitleType = {
    type: 'CHANGE-TASK-TITLE'
    todoListID: string
    id: string
    title: string
}

export const initialState : TasksStateType= { }
// {[todoListID1]: [
//         {id: v1(), title: "HTML&CSS", isDone: true},
//         {id: v1(), title: "JS", isDone: true},
//         {id: v1(), title: "ReactJS", isDone: false},
//         {id: v1(), title: "Rest API", isDone: false},
//         {id: v1(), title: "GraphQL", isDone: false},
//     ], [todoListID2]: [
//         {id: v1(), title: "HTML&CSS", isDone: true},
//         {id: v1(), title: "JS", isDone: true},
//         {id: v1(), title: "ReactJS", isDone: false},
//         {id: v1(), title: "Rest API", isDone: false},
//         {id: v1(), title: "GraphQL", isDone: false},
//     ]
// }

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state}
            let todoListTask = copyState[action.todoListID]
            copyState[action.todoListID] = todoListTask.filter(tl => tl.id !== action.id)
            return copyState
        }
        case 'ADD-TASK': {
            let copyState = {...state}
            let task = {id: v1(), title: action.title, isDone: false}
            let todoListTasks = copyState[action.todoListID]
            copyState[action.todoListID] = [task, ...todoListTasks]
            return copyState
        }
        case 'CHANGE-TASK-STATUS': {
            let task = state[action.todoListID]
            state[action.todoListID] = task.map(t => t.id === action.id ? {...t, isDone: action.taskStatus}: t);
            return {...state}
        }
        case "CHANGE-TASK-TITLE": {
            let task = state[action.todoListID]
            state[action.todoListID] = task.map(t => t.id === action.id ? {...t,  title: action.title } : t)
            return {...state}
        }
        case "ADD-TODOLIST":{
            return {...state, [action.todoListId]: []}
        }
        case "REMOVE-TODOLIST":{
            let stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }

        default:
            return state;
    }
}

export const removeTaskAC = (id: string, todoListID: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todoListID, id}
}
export const addTaskAC = (title: string, todoListID: string): AddTaskActionType => {
    return {type: "ADD-TASK", title, todoListID}
}
export const changeTaskStatusAC = (id: string, taskStatus: boolean, todoListID: string): ChangeTaskStatusType => {
    return {type: "CHANGE-TASK-STATUS", id, taskStatus, todoListID}
}
export const changeTaskTitleAC = (todoListID: string, id: string, title: string): changeTaskTitleType => {
    return {type: 'CHANGE-TASK-TITLE', todoListID, id, title}
}
