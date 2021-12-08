import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistApi} from "../Api/todolists-api";

export default {
    title: 'API'
}

const setting = {
    withCredentials: true,
    headers: {
        'API-KEY': 'e36cc859-2d32-4268-9e32-e789f71b72ba'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodolists()
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.createTodolist('One')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "4932604e-72f1-4450-b441-ddb8f65d1718"
        todolistApi.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '65b417ef-2b42-4aec-9069-71828bb72dd6';
        const title = 'two-one';
        todolistApi.updateTodolistTitle(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '18ffa665-1666-4eab-a812-25e30ead9fc4';
        todolistApi.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = ()=>{
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '0c7c59fd-10ad-414e-aa44-3b74d6638a00';
        const taskId = ''
        todolistApi.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const CreatTask = ()=>{
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '18ffa665-1666-4eab-a812-25e30ead9fc4';
        const title = 'taska add'
        todolistApi.createTask(todolistId, title )
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTask = ()=>{
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '18ffa665-1666-4eab-a812-25e30ead9fc4';
        const taskId = '126e42c0-cfac-4191-9314-06e075334ada'
        const title = 'update add'
        todolistApi.updateTask(todolistId, taskId, title )
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}


