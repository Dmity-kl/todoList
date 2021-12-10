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
    const getTodolist = () => {
        todolistApi.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <button onClick={getTodolist}>Get Todolist</button>
        </div>
    </div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [input, setInput] = useState<any>(null)

    const createTodolist = () => {
        todolistApi.createTodolist(input)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input type="text"
                   placeholder={'Add name Todolist'}
                   value={input}
                   onChange={(e) => {
                       setInput(e.currentTarget.value)
                   }}
            />
            <button onClick={createTodolist}>Add</button>
        </div>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<any>(null)
    const deleteTodolist = () => {
        todolistApi.deleteTodolist(title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input type="text"
                   placeholder={'todolistId'}
                   value={title}
                   onChange={(e) => {
                       setTitle(e.currentTarget.value)
                   }}
            />
            <button onClick={deleteTodolist}>Delete</button>
        </div>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [title, setTitle] = useState<any>(null)

    const updateTodolistTitle = () => {
        todolistApi.updateTodolistTitle(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input type="text"
                   placeholder={'todolistId'}
                   value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}/>
            <input type="text"
                   placeholder={'title'}
                   value={title}
                   onChange={(e) => {
                       setTitle(e.currentTarget.value)
                   }}/>
            <button onClick={updateTodolistTitle}>Update</button>
        </div>
    </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const getTasks = () => {
        todolistApi.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input type="text"
                   placeholder={'todolistId'}
                   value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}
            />
            <button onClick={getTasks}>Get Tasks</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)

    const deleteTask = () => {
        todolistApi.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input type="text"
                   placeholder={'todoListId'}
                   value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}
            />
            <input type="text"
                   placeholder={'taskId'}
                   value={taskId}
                   onChange={(e) => {
                       setTaskId(e.currentTarget.value)
                   }}
            />
            <button onClick={deleteTask}>Delete task</button>

        </div>

    </div>
}

export const CreatTask = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const createTask = () => {
        todolistApi.createTask(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input type="text"
                   placeholder={'todolistId'}
                   value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}
            />
            <input type="text"
                   placeholder={'title'}
                   value={title}
                   onChange={(e) => {
                       setTitle(e.currentTarget.value)
                   }}
            />
            <button onClick={createTask}>Create task</button>
        </div>

    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>(null)
    const [title, setTitle] = useState<any>(null)
    const updateTask = () => {
        const todolistId = '18ffa665-1666-4eab-a812-25e30ead9fc4';
        const taskId = '126e42c0-cfac-4191-9314-06e075334ada'
        const title = 'update add'
        todolistApi.updateTask(todolistId, taskId, title)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div> {JSON.stringify(state)}</div>
}


