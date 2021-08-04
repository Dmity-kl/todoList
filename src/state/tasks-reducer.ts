import {FilterValuesType, TasksStateType, TodoListsType} from "../App";
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


export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
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
            let copyState = {...state}
            let todoList = copyState[action.todoListID]
            let task = todoList.find(tl => tl.id === action.id)
            if (task) {
                task.isDone = action.taskStatus
            }
            return copyState
        }
        case "CHANGE-TASK-TITLE": {
            let copyState = {...state}
            let tasks = copyState[action.todoListID]
            let task = tasks.find(tl => tl.id === action.id)
            if (task) {
                task.title = action.title
            }
            return copyState
        }
        case "ADD-TODOLIST":{
            let stateCopy = state
            stateCopy[action.todoListId]= []
            return stateCopy
        }
        case "REMOVE-TODOLIST":{
            let stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }

        default:
            throw new Error("I don't understand this type")
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
