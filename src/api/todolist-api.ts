import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': '14693698-289e-4286-b43f-bba26af5e93a',
    },
})

export const todolistAPI = {
    getTodolist() {
        return instance.get<TodolistType[]>(
            'todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<TodolistType>>(
            'todo-lists',
            {title: 'newTodolist'}
        )
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(
            `todo-lists/${todolistId}`,
            {title: title}
        )
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(
            `todo-lists/${todolistId}`)
    }
}

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type ResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldErrorType[]
    data: T
}

export type FieldErrorType = {
    error: string
    field: string
}