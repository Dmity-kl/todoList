import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";


export type FilterValuesType = "all" | "active" | "completed";
type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
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
            filter: 'active'
        }
    ])

    let [tasks, setTasks] = useState({
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
        tasks[todoListID] = todoListTask.filter(t => t.id != id);
        setTasks({...tasks});
    }

    function addTask(title: string, todoListID: string) {
        let task = {id: v1(), title: title, isDone: false}
        let todoListTasks = tasks[todoListID]
        tasks[todoListID] = [task,...todoListTasks]
        setTasks({...tasks})
    }


    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks[taskId].find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }

        setTasks({...tasks});
    }

    function changeFilter(value: FilterValuesType, todoListID: string) {
        let todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }

    return (
        <div className="App">
            {
                todoLists.map(tl => {
                    let tasksForTodolist  = tasks[tl.id];

                    if (tl.filter === "active") {
                        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                    }
                    return <Todolist title={tl.title}
                                     key={tl.id}
                                     id={tl.id}
                                     tasks={tasksForTodolist}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     changeTaskStatus={changeStatus}
                                     filter={tl.filter}
                    />
                })
            }
        </div>
    );
}

export default App;
