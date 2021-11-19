import {FilterValuesType, TodoListsType} from "../App";
import {v1} from "uuid";

type ActionsType = RemoveTodoListActionType |
    AddTodoListActionType |
    ChangeTodoListActionType |
    ChangeTodoListFilterActionType

export type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST"
        [key: string]: any
    id: string
};
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todoListId: string
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

export const todoListID1 = v1()
export const todoListID2 = v1()


const initialState: Array<TodoListsType> = [ ]
//     {
//         id: todoListID1,
//         title: 'What to learn',
//         filter: 'all'
//     },
//     {
//         id: todoListID2,
//         title: 'What to buy',
//         filter: 'all'
//     }
// ]

export const todolistsReducer = (state: Array<TodoListsType> = initialState, action: ActionsType): Array<TodoListsType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{id: action.todoListId, title: action.title, filter: 'all'}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            let todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let copyState = [...state]
            let todoList = copyState.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
                return copyState
            }
        }
        default:
            return state;
    }
}

export const removeTodoListAC = (todoListID: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: todoListID}
}
export const addTodoListAC = (title: string): AddTodoListActionType => {
    return {type: "ADD-TODOLIST", title, todoListId: v1()}
}
export const changeTodoListTitleAC = (title:string, id: string):ChangeTodoListActionType  => {
    return {type: "CHANGE-TODOLIST-TITLE", title: title, id: id}
}
export const changeTodoListFilterAC = (id: string, filter: FilterValuesType):ChangeTodoListFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", id, filter}
}