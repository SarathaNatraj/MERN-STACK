import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Headline from './helloworld';
import UserList from './userlist';
import TodoList from './todolist';

function App() {

  const[task,setTask] = useState('');
  const [tasks, setTasks] = useState([]); // State to hold tasks

  function addTask(){
    console.log(" inside add Task");
    if (task.trim()) {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask(''); // Clear input after adding task
    }

  }


  return (
    <div className="App">
     <TodoList/>
    </div>
  );
}

export default App;
