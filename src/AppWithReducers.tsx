import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";


export type FilterValuesType = "all" | "active" | "completed";
export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {

    let todoListID1 = v1()
    let todoListID2 = v1()
    let [todoLists, dispatchToTodoListReducer] = useReducer(todolistsReducer, [
        {
            id: todoListID1,
            title: 'What to learn',
            filter: 'all'
        },
        {
            id: todoListID2,
            title: 'What to buy',
            filter: 'all'
        }
    ])

    let [tasks, dispatchToTaskReducer] = useReducer(tasksReducer, {
        [todoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ], [todoListID2]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ]
    });

    function removeTask(id: string, todoListID: string) {
        dispatchToTaskReducer(removeTaskAC(id, todoListID))
    }

    function addTask(title: string, todoListID: string) {
        dispatchToTaskReducer(addTaskAC(title, todoListID))
    }

    function changeStatus(taskID: string, isDone: boolean, todoListID: string) {
        dispatchToTaskReducer(changeTaskStatusAC(taskID, isDone, todoListID))
    }

    function removeTodoList(todoListID: string) {
        dispatchToTodoListReducer(removeTodoListAC(todoListID))
        dispatchToTaskReducer(removeTodoListAC(todoListID))
    }

    function changeTodoListTitle(newTitle: string, todoListID: string) {
        dispatchToTodoListReducer(changeTodoListTitleAC(newTitle, todoListID))
    }

    function addTodoList(title: string) {
        dispatchToTodoListReducer(addTodoListAC(title))
        dispatchToTaskReducer(addTodoListAC(title))
    }

    function changeTaskTitle(taskID: string, newValue: string, todoListID: string) {
        dispatchToTaskReducer(changeTaskTitleAC(todoListID, taskID, newValue))
    }

    function changeFilter(value: FilterValuesType, todoListID: string) {
        dispatchToTodoListReducer(changeTodoListFilterAC(todoListID, value))
    }

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

                            if (tl.filter === "active") {
                                tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                            }
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

export default AppWithReducers;
