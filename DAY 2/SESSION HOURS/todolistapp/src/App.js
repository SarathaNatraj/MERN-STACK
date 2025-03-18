import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  function handleAddTask() {
    if (taskText.trim() === "") {
      return;
    }

    if (editIndex !== null) {
      var updatedTasks = tasks.map(function (task, index) {
        return index === editIndex ? { ...task, text: taskText } : task;
      });
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks(tasks.concat({ text: taskText, completed: false }));
    }

    setTaskText("");
  }

  function handleDeleteTask(index) {
    var filteredTasks = tasks.filter(function (_, i) {
      return i !== index;
    });
    setTasks(filteredTasks);
  }

  function handleEditTask(index) {
    setTaskText(tasks[index].text);
    setEditIndex(index);
  }

  function toggleCompleteTask(index) {
    var updatedTasks = tasks.map(function (task, i) {
      return i === index ? { ...task, completed: !task.completed } : task;
    });
    setTasks(updatedTasks);
  }

  function handleInputChange(event) {
    setTaskText(event.target.value);
  }

  return (
    <div style={styles.container}>
      <h2>To-Do List</h2>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={taskText}
          onChange={handleInputChange}
          placeholder="Add a new task"
          style={styles.input}
        />
        <button onClick={handleAddTask} style={styles.button}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>
      <ul style={styles.list}>
        {tasks.map(function (task, index) {
          return (
            <li key={index} style={styles.listItem}>
              <span
                onClick={function () {
                  toggleCompleteTask(index);
                }}
                style={{
                  ...styles.taskText,
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.text}
              </span>
              <div>
                <button
                  onClick={function () {
                    handleEditTask(index);
                  }}
                  style={styles.editButton}
                >
                  Edit
                </button>
                <button
                  onClick={function () {
                    handleDeleteTask(index);
                  }}
                  style={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

var styles = {
  container: { textAlign: "center", maxWidth: "400px", margin: "auto" },
  inputContainer: { display: "flex", justifyContent: "center", marginBottom: "10px" },
  input: { padding: "8px", width: "70%", marginRight: "5px" },
  button: { padding: "8px", cursor: "pointer" },
  list: { listStyle: "none", padding: 0 },
  listItem: { display: "flex", justifyContent: "space-between", padding: "10px", border: "1px solid #ddd", marginBottom: "5px" },
  taskText: { cursor: "pointer", flex: 1, textAlign: "left" },
  editButton: { marginRight: "5px", background: "yellow", padding: "5px", cursor: "pointer" },
  deleteButton: { background: "red", color: "white", padding: "5px", cursor: "pointer" },
};

export default App;
