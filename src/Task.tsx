import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    removeTask: (taskId: string, todoListID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todoListID: string) => void
    todolistId: string
    task: TaskType
}

export const Task = React.memo ((props: TaskPropsType) => {
    const onClickHandler = useCallback(() => props.removeTask(props.task.id, props.todolistId),[props.removeTask, props.task.id, props.todolistId])
    const onChangeStatusHandler = useCallback ((e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistId);
    },[props.task.id, props.todolistId])
    const onChangeTitleHandler = useCallback ((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId);
    },[props.changeTaskTitle, props.todolistId])

    return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox size={"small"}
                  onChange={onChangeStatusHandler}
                  checked={props.task.isDone}/>
        <EditableSpan title={props.task.title}
                      onChangeValue={onChangeTitleHandler}
        />
        <IconButton onClick={onClickHandler} aria-label="delete" size={"small"}>
            <Delete/>
        </IconButton>
    </div>
} )