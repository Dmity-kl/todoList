import {instance, ResponseType, TodolistType} from "./todolist-api";

export const tasksApi = {
    getTasks(todolistId: string){
        return instance.get<TaskType[]>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string){
        return instance.post<ResponseType<TaskType>>(`/todo-lists/${todolistId}/tasks`, {
            title
        })
    },
    updateTask(todolistId: string, taskId: string, title: string){
        return instance.put<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`, {
            title
        })
    },
    deleteTask(todolistId: string, taskId: string){
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    }
}

export type TaskType = {
    item: {
        addedDate: string
        deadline: boolean
        description: boolean
        id: string
        order: number
        priority: number
        startDate: boolean
        status: number
        title: string
        todoListId: string
    }
}