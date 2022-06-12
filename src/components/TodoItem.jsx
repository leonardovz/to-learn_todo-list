import React from 'react'

export function TodoItem({ todo, toggleTodo }) {
    const { id, task, status } = todo;

    const handleTodoClick = () => {
        toggleTodo(id);
    }

    return (
        <li id={id} className={"list-group-item " + (status ? "active" : "inactive")}>
            <input type="checkbox" id={"check-" + id} onChange={handleTodoClick} checked={status} />
            <label className="ms-4" htmlFor={"check-" + id}>{task}</label>
        </li>
    )
}
