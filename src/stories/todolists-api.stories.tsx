import React, {useEffect, useState} from 'react'
import axios from "axios";
import {ResponseType, todolistAPI, TodolistType} from "../api/todolist-api";
import {tasksApi, TaskType} from "../api/tasks-api";

export default {
    title: 'API',
}
const settings = {
    withCredentials: true,
}
export const GetTodolists = () => {
    const [state, setState] = useState<TodolistType[] | null>(null)
    useEffect(() => {
        todolistAPI.getTodolist()
            .then(res => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<ResponseType<TodolistType> | null>(null)
    useEffect(() => {
        todolistAPI.createTodolist('Blabla')
            .then(res => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<ResponseType | null>(null)
    const todolistId = '0a1cee0a-b944-4b1c-9209-124cb4bef72b'
    useEffect(() => {
        todolistAPI.deleteTodolist(todolistId)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<ResponseType | null>(null)
    const todolistId = 'de5bfb52-1c67-47f3-b39a-3e8a3e3c7657'
    useEffect(() => {
        todolistAPI.updateTodolist(todolistId, 'alolo')
            .then(res => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<TaskType[] | null>(null)
    const todolistId = 'de5bfb52-1c67-47f3-b39a-3e8a3e3c7657'
    useEffect(() => {
        tasksApi.getTasks(todolistId)
            .then(res => {
                setState(res.data)
            })
    }, []);
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<ResponseType<TaskType> | null>(null)
    const todolistId = 'de5bfb52-1c67-47f3-b39a-3e8a3e3c7657'
    const title = 'Ты тут?'
    useEffect(() => {
        tasksApi.createTask(todolistId, title)
            .then(res => {
                console.log(res.data);
                setState(res.data)
            })
    }, []);

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<ResponseType | null>(null)

    const taskId = '756cde63-c21c-4a83-bef0-724aa4a585e0'
    const todolistId = 'de5bfb52-1c67-47f3-b39a-3e8a3e3c7657'
    const title = 'Да, я тут'
    useEffect(() => {
        tasksApi.updateTask(todolistId, taskId, title)
            .then(res => {
                setState(res.data)
            })
    }, []);
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<ResponseType | null >(null)
    const todolistId = 'de5bfb52-1c67-47f3-b39a-3e8a3e3c7657'
    const taskId = '756cde63-c21c-4a83-bef0-724aa4a585e0'
    useEffect(() => {
        tasksApi.deleteTask(todolistId, taskId)
            .then(res => {
                setState(res.data)
            })
    }, []);



    return <div>{JSON.stringify(state)}</div>

}
