import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {rootReducer} from "./store";

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export function AppWithRedux() {
    console.log('App is called')
    const todoLists = useSelector<ReturnType<typeof rootReducer>, Array<TodoListsType>>(state => state.todoList)
    const tasks = useSelector<ReturnType<typeof rootReducer>, TasksStateType >(state => state.task)
    const dispatch = useDispatch()

    const removeTask = useCallback ((id: string, todoListID: string) => {
        dispatch(removeTaskAC(id, todoListID))
    },[dispatch])

    const addTask = useCallback ((title: string, todoListID: string) => {
        dispatch(addTaskAC(title, todoListID))
    },[dispatch])

    const changeStatus = useCallback ((taskID: string, isDone: boolean, todoListID: string) => {
        dispatch(changeTaskStatusAC(taskID, isDone, todoListID))
    },[dispatch])

    const removeTodoList = useCallback ((todoListID: string) => {
        dispatch(removeTodoListAC(todoListID))
    },[dispatch])

    const changeTodoListTitle = useCallback ((newTitle: string, todoListID: string) => {
        dispatch(changeTodoListTitleAC(newTitle, todoListID))
    }, [dispatch])

    const addTodoList = useCallback ((title: string) => {
        dispatch(addTodoListAC(title))
    },[dispatch]);

    const changeTaskTitle = useCallback ((taskID: string, newValue: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(todoListID, taskID, newValue))
    },[dispatch])

    const changeFilter =useCallback ((value: FilterValuesType, todoListID: string) => {
        dispatch(changeTodoListFilterAC(todoListID, value))
    },[dispatch]);

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed style={{margin: '20px'}}>
                <Grid container>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map(tl => {
                            let tasksForTodolist = tasks[tl.id];

                            return <Grid item>
                                <Paper elevation={3} style={{margin: '10px'}}>
                                    <Todolist title={tl.title}
                                              key={tl.id}
                                              id={tl.id}
                                              tasks={tasksForTodolist}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeTaskStatus={changeStatus}
                                              filter={tl.filter}
                                              removeTodoList={removeTodoList}
                                              changeTaskTitle={changeTaskTitle}
                                              changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

