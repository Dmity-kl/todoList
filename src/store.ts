import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "./state/todolists-reducer";
import {tasksReducer} from "./state/tasks-reducer";

export const rootReducer = combineReducers({
    todoList: todolistsReducer,
    task: tasksReducer,
})

type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)


// @ts-ignore
window.store = store