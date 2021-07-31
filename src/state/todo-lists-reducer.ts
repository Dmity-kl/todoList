import {FilterValuesType, TodoListsType} from "../App";
import {v1} from "uuid";

type ActionsType = RemoveTodoListActionType |
    AddTodoListActionType |
    ChangeTodoListActionType |
    ChangeTodoListFilterActionType

export type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST"
        [key: string]: any
};
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
}
export type ChangeTodoListActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodoListsType>, action: ActionsType): Array<TodoListsType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id != action.id)
        case 'ADD-TODOLIST':
            return [{id: v1(), title: action.title, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE': {
            let todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER':
            let todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
                return [...state]
            }
        default:
            throw new Error("I don't understand this type")
    }
}

export const RemoveTodoListAC = (todoListID: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: todoListID}
}