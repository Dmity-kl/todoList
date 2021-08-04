import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";


export type FilterValuesType = "all" | "active" | "completed";
export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todoListID1 = v1()
    let todoListID2 = v1()
    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
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

    let [tasks, setTasks] = useState<TasksStateType>({
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
        let todoListTask = tasks[todoListID]
        tasks[todoListID] = todoListTask.filter(t => t.id !== id);
        setTasks({...tasks});
    }

    function addTask(title: string, todoListID: string) {
        let task = {id: v1(), title: title, isDone: false}
        let todoListTasks = tasks[todoListID]
        tasks[todoListID] = [task, ...todoListTasks]
        setTasks({...tasks})
    }

    function changeStatus(taskID: string, isDone: boolean, todoListID: string) {
        //достаем нужный массив по todoLitID
        let tasksForChangeStatus = tasks[todoListID]
        //найдем нужную таску
        let task = tasksForChangeStatus.find(t => t.id === taskID);
        if (task) {
            //изменим таску если она нашлась
            task.isDone = isDone;
            // засетаем в стейт копию объекта, чтобы React отреагировал и перерисовал
            setTasks({...tasks});
        }
    }

    function changeFilter(value: FilterValuesType, todoListID: string) {
        let todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }

    function removeTodoList(todoListID: string) {
        let removedTodoList = todoLists.filter(tl => tl.id !== todoListID)
        delete tasks[todoListID]
        setTodoLists(removedTodoList)
    }

    function changeTodoListTitle(newTitle: string, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
    }

    function addTodoList(title: string) {
        let todoList: TodoListsType = {
            id: v1(),
            title: title,
            filter: "all",
        }
        setTodoLists([todoList, ...todoLists])
        setTasks({...tasks, [todoList.id]: []})
    }

    function changeTaskTitle(taskID: string, newValue: string, todoListID: string) {
        //достаем нужный массив по todoLitID
        let tasksForChangeStatus = tasks[todoListID]
        //найдем нужную таску
        let task = tasksForChangeStatus.find(t => t.id === taskID);
        //изменим таску если она нашлась
        if (task) {
            task.title = newValue;
            // засетаем в стейт копию объекта, чтобы React отреагировал и перерисовал
            setTasks({...tasks});
        }
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
                            return <Grid item >
                                <Paper elevation={3} style={ {margin: '10px'}}>
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

export default App;
