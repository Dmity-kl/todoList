import React, {useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todoListID: string) => void
    filter: FilterValuesType
    id: string
    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (newTitle: string, todoListID: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    const ChangeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(newTitle, props.id)
    }, [props.id, props.changeTodoListTitle])
    //help
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    let tasksForTodolist = props.tasks;
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone);
    }

    return <div>
        <h3 style={{textAlign: 'center'}}><EditableSpan title={props.title} onChangeValue={ChangeTodoListTitle}/>
            <IconButton onClick={removeTodoList} aria-label="delete">
                <Delete/>
            </IconButton>
        </h3>

        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => <Task
                    task={t}
                    changeTaskTitle={props.changeTaskTitle}
                    todolistId={props.id}
                    key={t.id}
                    changeTaskStatus={props.changeTaskStatus}
                    removeTask={props.removeTask}
                />)
            }
        </ul>
        <div>
            <Button variant={"outlined"} color={props.filter === 'all' ? "secondary" : "default"}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button variant={"outlined"} color={props.filter === 'active' ? "secondary" : "default"}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button variant={"outlined"} color={props.filter === 'completed' ? "secondary" : "default"}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
})

