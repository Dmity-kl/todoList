import React, {useEffect, useState} from 'react'
import axios from "axios";

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
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', setting)
            .then((res)=>{
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: 'труляля'}, setting)
            .then((res)=>{
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "91d4843e-7f12-4150-b242-a836f9a2621c"
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,  setting)
            .then((res)=>{
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '4fec464e-e8ea-4f8f-bd49-c6d2217587fe'
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: 'лялятру'}, setting)
            .then((res)=>{
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
