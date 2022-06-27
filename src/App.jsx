import { React, Fragment, useState, useRef, useEffect } from 'react';
import { TodoList } from './components/TodoList';
import { v4 as uuidv4 } from "uuid";



const KEY = "todoApp.todos";

export function App() {
    const data = [
        { id: 1, task: "create new task", status: true },
        { id: 2, task: "Send new mail service", status: false },
    ];

    const [todos, setTodos] = useState(data);

    const todoTaskRef = useRef();

    useEffect(() => {
        const storageTodos = JSON.parse(localStorage.getItem(KEY));
        if (storageTodos) setTodos(storageTodos);
    }, []);

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos));
    }, [todos]);



    const toggleTodo = (id) => {
        const newTodos = [...todos];
        const todo = newTodos.find(todo => todo.id === id);
        todo.status = !todo.status;
        setTodos(newTodos);
    }


    const handleTodoAdd = (e) => {
        e.preventDefault();
        const task = todoTaskRef.current.value;
        if (task === '') return;
        setTodos((prevTodos) => {
            return [...prevTodos, { id: uuidv4(), task, status: false }];
        });

        todoTaskRef.current.value = null;
    }
    const handleClearAll = () => {
        const newTodos = todos.filter(todo => !todo.status);
        setTodos(newTodos);
    }


    return (
        <Fragment>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col py-5">
                        <form onSubmit={handleTodoAdd} >
                            <div className="input-group mb-0">
                                <input className="form-control" ref={todoTaskRef} type="text" placeholder="Nombre de la tarea" />
                                <span className="btn btn-success" onClick={handleTodoAdd}><i className="bi bi-plus-circle"></i></span>
                            </div>
                        </form>
                        <span className="d-block px-2 text-muted">Te quedan <b className="text-dark">{todos.filter((todo) => !todo.status).length}</b> tareas por terminar</span>

                    </div>
                    <div className="col-12">
                        <TodoList todos={todos} toggleTodo={toggleTodo} />
                    </div>
                    <div className="col-12 mt-3">
                        <button className="btn btn-danger w-100 btn-sm" onClick={handleClearAll}>Clear all finished</button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
