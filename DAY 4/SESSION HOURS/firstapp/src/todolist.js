import React, { useState, useEffect } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  function fetchTodos() {
    fetch("http://localhost:5000/todos")
      .then(res => res.json())
      .then(data => setTodos(data));
  }

  function addTodo() {
    
    if (!task.trim()) return;
    
    fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task })
    })
      .then(res => res.json())
      .then(newTodo => setTodos([...todos, newTodo]));

    setTask("");
  }

  function toggleComplete(id, completed) {
    fetch(`http://localhost:5000/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed })
    })
      .then(res => res.json())
      .then(updatedTodo => {
        setTodos(todos.map(todo => todo._id === id ? updatedTodo : todo));
      });
  }

  function deleteTodo(id) {
    fetch(`http://localhost:5000/todos/${id}`, { method: "DELETE" })
      .then(() => setTodos(todos.filter(todo => todo._id !== id)));
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={task}
        onChange={e => setTask(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo._id} style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
            {todo.task}
            <button onClick={() => toggleComplete(todo._id, todo.completed)}>✓</button>
            <button onClick={() => deleteTodo(todo._id)}>🗑</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
