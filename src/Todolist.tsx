import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, createTheme, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {purple} from "@material-ui/core/colors";

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
    changeTodoListTitle: (newTitle: string, todoListID:string)=>void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    const ChangeTodoListTitle = (newTitle:string) => {
        props.changeTodoListTitle(newTitle, props.id)
    }
    //help
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return <div>
        <h3 style={{textAlign: 'center'} }> <EditableSpan title={props.title} onChangeValue={ChangeTodoListTitle} />
            <IconButton onClick={removeTodoList} aria-label="delete">
                <Delete/>
            </IconButton>
        </h3>

        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id);
                    }

                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox size={"small"}
                               onChange={onChangeStatusHandler}
                               checked={t.isDone}/>
                        <EditableSpan title={t.title}
                                      onChangeValue={onChangeTitleHandler}
                        />
                        <IconButton onClick={onClickHandler} aria-label="delete" size={"small"}>
                            <Delete />
                        </IconButton>
                    </div>
                })
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
}

